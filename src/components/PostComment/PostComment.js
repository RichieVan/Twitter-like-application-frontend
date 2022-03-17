import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import PostOptions from '../PostOptions/PostOptions';
import LikeButton from '../LikeButton/LikeButton';
import { Context } from '../../Context';

function PostComment({ data, contentArray, postOwner }) {
  const { userStore, appStore } = useContext(Context);
  const [commentData, setCommentData] = useState({ ...data });

  return (
    <div className="comment">
      <div className="comment__wrapper">
        <div className="comment__avatar">
          <Link
            className="comment__avatar-link"
            style={{ backgroundImage: `url(${commentData.user.id === userStore.user.id ? userStore.user.avatar.url : commentData.user.avatar.url})` }}
            to={`/profile/${commentData.user.login}`}
          />
        </div>
        <div className="comment__content-wrapper">
          <div className="comment__heading">
            <div className="comment__heading-info">
              <Link
                to={`/profile/${commentData.user.login}`}
                className="comment__profile-link"
              >
                {commentData.user.username}
              </Link>
              <div
                className="comment__datetime"
                title={commentData.createdAt.title}
              >
                {commentData.createdAt.view}
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
      <PostOptions
        show={appStore.activePostOptions?.id === commentData.id && appStore.activePostOptions?.type === 'comment'}
        owner={commentData.user.id}
        postId={commentData.id}
        type="comment"
      />
      <div className="comment__panel">
        <LikeButton
          componentData={commentData}
          setComponentData={setCommentData}
          mods={['for_comment']}
        />
      </div>
    </div>
  );
}

export default observer(PostComment);
