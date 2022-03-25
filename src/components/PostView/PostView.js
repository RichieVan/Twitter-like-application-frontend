import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import PostOptions from '../PostOptions/PostOptions';
import PostService from '../../services/PostService';
import LoadingMask from '../LoadingMask/LoadingMask';
import formatPostText from '../../lib/formatPostText/formatPostText';
import PostForm from '../PostForm/PostForm';
import CommentsList from '../CommentsList/CommentsList';
import LikeButton from '../LikeButton/LikeButton';
import CommentButton from '../CommentButton/CommentButton';
import { Context } from '../../Context';
import CopyLinkButton from '../CopyLinkButton/CopyLinkButton';

function PostView() {
  const {
    userStore,
    appStore,
    notificationStore,
  } = useContext(Context);
  const [postData, setPostData] = useState(null);
  const isFirstLoading = useRef(true);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  if (isFirstLoading.current) {
    PostService.getById(params.id)
      .then((result) => {
        if (!result.data) {
          notificationStore.show('Пост не найден', 3000);
          navigate(location.state?.backgroundLocation || '/feed');
        } else {
          isFirstLoading.current = false;
          setPostData(
            Object.assign(
              result.data,
              {
                contentArray: formatPostText(result.data.textContent),
              },
            ),
          );
        }
      });
  }

  if (isFirstLoading.current) {
    return (
      <div className="post-view">
        <LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={1} />
      </div>
    );
  }

  const avatarUrl = (postData.user.id === userStore.user.id)
    ? userStore.user.avatar.url
    : postData.user.avatar.url;

  const isActivePost = appStore.activePostOptions?.id === postData.id;
  const isPostViewType = appStore.activePostOptions?.type === 'postView';

  return (
    <div className="post-view">
      <article className="post-view__wrapper">
        <div className="post-view__inner-wrapper">
          <div className="post-view__heading">
            <div className="post-view__avatar">
              <div
                className="post-view__avatar-link"
                style={{ backgroundImage: `url(${avatarUrl})` }}
              />
            </div>
            <div className="post-view__info">
              <div className="post-view__info-inner">
                <Link
                  to={`/profile/${postData.user.login}`}
                  className="post-view__profile-link"
                >
                  {postData.user.username}
                </Link>
                <div
                  className="post-view__datetime"
                  title={postData.createdAt.title}
                >
                  {postData.createdAt.view}
                </div>
              </div>
              <div className="post-view__tag">{`@${postData.user.login}`}</div>
            </div>
          </div>
          <div className="post-view__content-wrapper">
            <div className="post-view__content">
              {postData.contentArray}
            </div>
          </div>
        </div>
        <PostOptions
          show={isActivePost && isPostViewType}
          owner={postData.user.id}
          postId={postData.id}
          type="postView"
          mods={['big']}
        />
        <div className="post-view__panel">
          <LikeButton
            componentData={postData}
            setComponentData={setPostData}
          />
          <CommentButton
            postData={postData}
            isNavigate={false}
          />
          <CopyLinkButton postId={postData.id} />
        </div>
      </article>
      {userStore.isAuth && (
        <PostForm
          type="comment"
          postId={postData.id}
        />
      )}
      <CommentsList
        postId={params.id}
        postOwner={postData.user}
      />
    </div>
  );
}

export default observer(PostView);
