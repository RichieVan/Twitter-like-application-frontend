import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLink } from '@fortawesome/free-solid-svg-icons';

import ConfirmAction from '../popup/ConfirmAction';
import { Context } from '../..';
import { APP_URL } from '../../http';

function PostOptions({
  show,
  owner,
  postId,
  type,
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

  const classList = [
    'post-options__list-container',
    show ? ' active' : '',
  ];

  const optionsList = {
    deletePost: userStore.user.id === owner,
    copyLink: type === 'postView' || type === 'post',
  };

  const availableOptions = Object.keys(optionsList).filter((key) => optionsList[key] !== false);
  const showOptions = availableOptions.length > 0;

  const deleteActionHandler = () => {
    modalStore.openModal(
      <ConfirmAction
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

  return (
    <div className="post-options">
      {showOptions && (
        <div className="post-options__wrapper">
          <button
            type="button"
            className="post-options__open-button"
            onClick={(e) => {
              e.stopPropagation();
              appStore.setActivePostOptions({ id: postId, type });
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <div
            className={classList.join('')}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="post-options__list">
              {optionsList.copyLink && (
                <li className="post-options__option">
                  <button
                    type="button"
                    className="post-options__option-button"
                    onClick={() => copyActionHandler()}
                  >
                    <i className="post-options__option-icon icon">
                      <FontAwesomeIcon icon={faLink} />
                    </i>
                    <span>Скопировать ссылку</span>
                  </button>
                </li>
              )}
              {optionsList.deletePost && (
              <li className="post-options__option">
                <button
                  type="button"
                  className="post-options__option-button  post-options__option-button_type_delete"
                  onClick={() => deleteActionHandler()}
                >
                  <i className="post-options__option-icon icon">
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
