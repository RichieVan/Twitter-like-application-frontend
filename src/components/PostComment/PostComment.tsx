import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import PostOptions from '../PostActions/PostActions';
import LikeButton from '../LikeButton/LikeButton';
import { Context } from '../../Context';
import { PostCommentProps } from './types';
import formatPostText from '../../lib/formatPostText/formatPostText';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import PostService from '../../services/PostService';
import ErrorHelper from '../../helpers/ErrorHelper';
import { PostAction } from '../PostActions/types';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const PostComment: FC<PostCommentProps> = ({
  data,
  postOwner,
  deleteCommentHandler,
}) => {
  const { userStore, appStore, notificationStore, modalStore, postStore } = useContext(Context);

  const deleteActionHandler = () => {
    modalStore.openModal(
      <ConfirmPopup
        text={['Вы уверены что хотите удалить комментарий?', 'Это действие нельзя отменить.']}
        confirmText="Удалить"
        declineText="Отмена"
        confirmButtonMods={['fill', 'error']}
        confirmAction={async (): Promise<void> => {
          try {
            await PostService.deletePost(data.id);
            deleteCommentHandler(data.id);
            notificationStore.show('Комментарий удален', 2500, 'success');
          } catch (e) {
            ErrorHelper.handleUnexpectedError();
          }
        }}
      />,
      {
        heading: 'Подтвердите действие',
        temporal: true,
      },
    );
  };

  const actions: PostAction[] = [];
  if (userStore.user && userStore.user.id === data.user.id) {
    actions.push({
      name: 'Удалить комментарий',
      handler: deleteActionHandler,
      icon: faBan,
      type: 'error',
    });
  }

  const contentArray = formatPostText(data.textContent);
  const isActivePost = appStore.activePostOptions?.id === data.id;
  const isPostViewType = appStore.activePostOptions?.type === 'comment';
  const showActions = isActivePost && isPostViewType;

  return (
    <div className="comment">
      <div className="comment__wrapper">
        <div className="comment__avatar">
          <Link
            className="comment__avatar-link"
            style={{ backgroundImage: `url(${data.user.id === userStore.user?.id ? userStore.user.avatar.url : data.user.avatar.url})` }}
            to={`/profile/${data.user.login}`}
          />
        </div>
        <div className="comment__content-wrapper">
          <div className="comment__heading">
            <div className="comment__heading-info">
              <Link
                to={`/profile/${data.user.login}`}
                className="comment__profile-link"
              >
                {data.user.username}
              </Link>
              <div
                className="comment__datetime"
                title={data.createdAt.title}
              >
                {data.createdAt.view}
              </div>
            </div>
            <div className="comment__answer-to">
              В ответ
              <Link to={`/profile/${postOwner.login}`}>{`@${postOwner.login}`}</Link>
            </div>
          </div>
          <div className="comment__content">
            {contentArray}
          </div>
        </div>
      </div>
      {actions.length > 0 && (
        <PostOptions
          actions={actions}
          show={showActions}
          showHandler={() => {
            appStore.setActivePostOptions({
              id: data.id,
              type: 'comment',
            })
          }}
        />
      )}
      <div className="comment__panel">
        <LikeButton
          postData={data}
          mods={['for_comment']}
        />
      </div>
    </div>
  );
};

export default observer(PostComment);
