import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLink } from '@fortawesome/free-solid-svg-icons';

import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import { Context } from '../..';
import { APP_URL } from '../../http';

function PostOptions({
  show,
  owner,
  postId,
  type,
  mods = [],
}) {
  const {
    userStore,
    postStore,
    modalStore,
    notificationStore,
    appStore,
  } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const optionsList = {
    deletePost: userStore.user.id === owner,
    copyLink: type === 'postView' || type === 'post',
  };

  const availableOptions = Object.keys(optionsList).filter((key) => optionsList[key] !== false);
  const showOptions = availableOptions.length > 0;

  const deleteActionHandler = () => {
    modalStore.openModal(
      <ConfirmPopup
        text={['Вы уверены что хотите удалить пост?', 'Это действие нельзя отменить.']}
        confirmText="Удалить"
        declineText="Отмена"
        confirmButtonStyles="fill error"
        confirmAction={() => {
          const promise = new Promise((resolve) => {
            if (type === 'comment') {
              postStore.deleteComment(postId).then(() => {
                notificationStore.show('Комментарий удален', 2500, 'success');
                resolve();
              });
            }
            if (type === 'post') {
              postStore.deletePost(postId).then(() => {
                notificationStore.show('Пост удален', 2500, 'success');
                resolve();
              });
            }
            if (type === 'postView') {
              postStore.deletePost(postId).then(() => {
                notificationStore.show('Пост удален', 2500, 'success');
                navigate(location.state.backgroundLocation);
                resolve();
              });
            }
          });
          return promise;
        }}
      />,
      {
        heading: 'Подтвердите действие',
        temporal: true,
      },
    );
  };

  const copyActionHandler = () => {
    window.navigator.clipboard.writeText(`${APP_URL}/post/${postId}`)
      .then(() => {
        notificationStore.show('Скопировано!', 2000, 'success');
      });
  };

  const baseClass = 'post-options';
  const listContainerClassList = [
    `${baseClass}__list-container`,
    show ? `${baseClass}__list-container_active` : '',
  ].join(' ');
  const optionsClassList = [baseClass].concat(mods.map((val) => `${baseClass}_${val}`)).join(' ');

  return (
    <div className={optionsClassList}>
      {showOptions && (
        <div className={`${baseClass}__wrapper`}>
          <button
            type="button"
            className={`${baseClass}__open-button`}
            onClick={(e) => {
              e.stopPropagation();
              appStore.setActivePostOptions({ id: postId, type });
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <div
            className={listContainerClassList}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className={`${baseClass}__list`}>
              {optionsList.copyLink && (
                <li className={`${baseClass}__option`}>
                  <button
                    type="button"
                    className={`${baseClass}__option-button`}
                    onClick={() => copyActionHandler()}
                  >
                    <i className={`${baseClass}__option-icon icon`}>
                      <FontAwesomeIcon icon={faLink} />
                    </i>
                    <span>Скопировать ссылку</span>
                  </button>
                </li>
              )}
              {optionsList.deletePost && (
              <li className={`${baseClass}__option`}>
                <button
                  type="button"
                  className={`${baseClass}__option-button  ${baseClass}__option-button_type_delete`}
                  onClick={() => deleteActionHandler()}
                >
                  <i className={`${baseClass}__option-icon icon`}>
                    <FontAwesomeIcon icon={faLink} />
                  </i>
                  <span>Удалить пост</span>
                </button>
              </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(PostOptions);
