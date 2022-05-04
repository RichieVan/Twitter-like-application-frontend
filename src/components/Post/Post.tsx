import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import PostOptions from '../PostActions/PostActions';
import LikeButton from '../LikeButton/LikeButton';
import CommentButton from '../CommentButton/CommentButton';
import { PostProps } from './types';
import formatPostText from '../../lib/formatPostText/formatPostText';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import PostService from '../../services/PostService';
import ErrorHelper from '../../helpers/ErrorHelper';
import { APP_URL } from '../../http';
import { faBan, faLink } from '@fortawesome/free-solid-svg-icons';
import { PostAction } from '../PostActions/types';

const Post: FC<PostProps> = ({
  data,
}) => {
  const { userStore, modalStore, postStore, notificationStore, appStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const postClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.currentTarget.localName in ['a', 'button'])) {
      navigate(`/post/${data.id}`, {
        state: { backgroundLocation: location.pathname },
      });
    }
  };

  const deleteActionHandler = () => {
    modalStore.openModal(
      <ConfirmPopup
        text={['Вы уверены что хотите удалить пост?', 'Это действие нельзя отменить.']}
        confirmText="Удалить"
        declineText="Отмена"
        confirmButtonMods={['fill', 'error']}
        confirmAction={async (): Promise<void> => {
          try {
            const { data: deletedPostId } = await PostService.deletePost(data.id);
            postStore.deleteFromFeedPostsList(deletedPostId);
            notificationStore.show('Пост удален', 2500, 'success');
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
  const isActivePost = appStore.activePostOptions?.id === data.id;
  const isPostViewType = appStore.activePostOptions?.type === 'post';
  const showActions = isActivePost && isPostViewType;

  return (
    <article className="post post_type_feed">
      <div
        className="post__wrapper"
        role="presentation"
        onClick={(e) => postClickHandler(e)}
      >
        <div className="post__avatar">
          <Link
            to={`/profile/${data.user.login}`}
            className="post__avatar-link"
            style={{ backgroundImage: `url(${data.user.id === userStore.user?.id ? userStore.user.avatar.url : data.user.avatar.url})` }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div className="post__content-wrapper">
          <div className="post__heading">
            <Link
              to={`/profile/${data.user.login}`}
              className="post__profile-link"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {data.user.username}
            </Link>
            <div className="post__datetime" title={data.createdAt.title}>{data.createdAt.view}</div>
          </div>
          <div className="post__content">
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
            type: 'post',
          })
        }}
      />
      <div className="post__panel">
        <LikeButton postData={data} />
        <CommentButton postData={data} />
      </div>
    </article>
  );
};

export default observer(Post);
