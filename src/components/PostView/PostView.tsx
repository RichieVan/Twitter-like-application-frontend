import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  Link,
  Navigate,
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
import { LocationStateProps, PostData, PostViewParams } from '../../types/types';

const PostView: FC = () => {
  const {
    userStore,
    appStore,
    notificationStore,
  } = useContext(Context);
  const [postData, setPostData] = useState<PostData | null>(null);
  const isFirstLoading = useRef(true);
  const params = useParams<PostViewParams>();
  const navigate = useNavigate();
  const location = useLocation();

  const paramsId = Number(params.id);
  if (params.id && !Number.isNaN(paramsId)) {
    if (!postData) {
      if (paramsId) {
        PostService
          .getById(Number(paramsId))
          .then((result) => {
            const { data } = result;
            if (!data) {
              notificationStore.show('Пост не найден', 3000);
              const state = location.state as LocationStateProps;
              navigate(state?.backgroundLocation || '/feed');
            } else {
              isFirstLoading.current = false;
              const contentArray = formatPostText(data.textContent);
              setPostData({ ...data, contentArray });
            }
          });
      }

      return (
        <div className="post-view">
          <LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={1} />
        </div>
      );
    }

    let avatarUrl: string = '';
    if (userStore.user && postData.user.id === userStore.user.id) {
      avatarUrl = userStore.user.avatar.url;
    } else {
      avatarUrl = postData.user.avatar.url;
    }

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
              postData={postData}
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
          postId={paramsId}
          postOwner={postData.user}
        />
      </div>
    );
  }

  notificationStore.show('Пост не найден', 3000);
  return (
    <Navigate to="/feed" />
  );
};

export default observer(PostView);
