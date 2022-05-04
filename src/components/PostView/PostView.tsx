import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useContext,
} from 'react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import PostOptions from '../PostOptions/PostOptions';
import PostService from '../../services/PostService';
import formatPostText from '../../lib/formatPostText/formatPostText';
import LikeButton from '../LikeButton/LikeButton';
import CommentButton from '../CommentButton/CommentButton';
import { Context } from '../../Context';
import CopyLinkButton from '../CopyLinkButton/CopyLinkButton';
import { LocationStateProps } from '../../types/types';
import CommentsController from '../CommentsController/CommentsController';
import { PostViewProps } from './types';
import { PostAction } from '../PostOptions/types';
import { faBan, faLink } from '@fortawesome/free-solid-svg-icons';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import { APP_URL } from '../../http';
import ErrorHelper from '../../helpers/ErrorHelper';

const PostView: FC<PostViewProps> = ({
  data,
}) => {
  const {
    postStore,
    userStore,
    appStore,
    modalStore,
    notificationStore,
  } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  if (!data) return null;

  const deleteActionHandler = () => {
    modalStore.openModal(
      <ConfirmPopup
        text={['Вы уверены что хотите удалить пост?', 'Это действие нельзя отменить.']}
        confirmText="Удалить"
        declineText="Отмена"
        confirmButtonMods={['fill', 'error']}
        confirmAction={async (): Promise<void> => {
          try {
            await PostService.deletePost(data.id);
            notificationStore.show('Пост удален', 2500, 'success');
            const state = location.state as LocationStateProps;
            navigate(state?.backgroundLocation || '/feed');
            if (postStore.syncFunction) postStore.syncFunction();
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

  const copyActionHandler = () => {
    window.navigator.clipboard.writeText(`${APP_URL}/post/${data.id}`)
      .then(() => {
        notificationStore.show('Скопировано!', 2000, 'success');
      });
  };

  const actions: PostAction[] = [{
    name: 'Скопировать ссылку',
    handler: copyActionHandler,
    icon: faLink,
  }];
  if (userStore.user && userStore.user.id === data.user.id) {
    actions.push({
      name: 'Удалить пост',
      handler: deleteActionHandler,
      icon: faBan,
      type: 'error',
    });
  }

  const contentArray = formatPostText(data.textContent);

  const currentUser = data.user.id === userStore.user?.id ? userStore.user : data.user;
  const isActivePost = appStore.activePostOptions?.id === data.id;
  const isPostViewType = appStore.activePostOptions?.type === 'postView';
  const showActions = isActivePost && isPostViewType;

  return (
    <div className="post-view">
      <article className="post-view__wrapper">
        <div className="post-view__inner-wrapper">
          <div className="post-view__heading">
            <div className="post-view__avatar">
              <div
                className="post-view__avatar-link"
                style={{ backgroundImage: `url(${currentUser.avatar.url})` }}
              />
            </div>
            <div className="post-view__info">
              <div className="post-view__info-inner">
                <Link
                  to={`/profile/${currentUser.login}`}
                  className="post-view__profile-link"
                >
                  {currentUser.username}
                </Link>
                <div
                  className="post-view__datetime"
                  title={data.createdAt.title}
                >
                  {data.createdAt.view}
                </div>
              </div>
              <div className="post-view__tag">{`@${currentUser.login}`}</div>
            </div>
          </div>
          <div className="post-view__content-wrapper">
            <div className="post-view__content">
              {contentArray}
            </div>
          </div>
        </div>
        <PostOptions
          actions={actions}
          show={showActions}
          showHandler={() => {
            appStore.setActivePostOptions({
              id: data.id,
              type: 'postView',
            })
          }}
          showButtonMods={['big']}
        />
        <div className="post-view__panel">
          <LikeButton
            postData={data}
          />
          <CommentButton
            postData={data}
            isNavigate={false}
          />
          <CopyLinkButton postId={data.id} />
        </div>
      </article>
      <div className="post-view__comments">
        <CommentsController
          postData={data}
        />
      </div>
    </div>
  );
};

export default observer(PostView);
