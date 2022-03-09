import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './style.css';
import { Context } from '../..';
import PostOptions from './PostOptions';
import LikeButton from './buttons/like';
import CommentButton from './buttons/comments';

function Post({ id, options, contentArray }) {
  const { userStore, appStore, postStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [postData, setPostData] = useState({ ...options });

  useEffect(() => {
    setPostData({ ...options });
  }, [options]);

  const postClickHandler = (e) => {
    if (!(e.target.localName in ['a', 'button'])) {
      postStore.setCurrentCommentsList([], true);
      navigate(`/post/${postData.id}`, {
        state: { backgroundLocation: location.pathname },
      });
    }
  };

  return (
    <article className="post feed-view">
      <div
        className="content-wrapper"
        onClick={(e) => postClickHandler(e)}
      >
        <div className="avatar-container">
          <Link
            to={`/profile/${postData.user.login}`}
            className="avatar"
            style={{ backgroundImage: `url(${postData.user.id === userStore.user.id ? userStore.user.avatar.url : postData.user.avatar.url})` }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div className="post-contents">
          <div className="heading">
            <Link
              to={`/profile/${postData.user.login}`}
              className="profile-name"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {postData.user.username}
            </Link>
            <div className="datetime-created" title={postData.createdAt.title}>{postData.createdAt.view}</div>
          </div>
          <div className="content">
            {contentArray}
          </div>
        </div>
      </div>
      <PostOptions
        show={appStore.activePostOptions?.id === id && appStore.activePostOptions?.type === 'post'}
        owner={postData.user.id}
        postId={id}
        type="post"
      />
      <div className="bottom-panel">
        <LikeButton componentData={postData} setComponentData={setPostData} />
        <CommentButton componentData={postData} />
      </div>
    </article>
  );
}

export default observer(Post);
