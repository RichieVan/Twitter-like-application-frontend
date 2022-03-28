import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import PostOptions from '../PostOptions/PostOptions';
import LikeButton from '../LikeButton/LikeButton';
import CommentButton from '../CommentButton/CommentButton';
import { PostProps } from './types';

const Post: FC<PostProps> = ({
  id,
  data,
  contentArray,
}) => {
  const { userStore, appStore, postStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [postData, setPostData] = useState(data);

  useEffect(() => {
    setPostData(data);
  }, [data]);

  const postClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.currentTarget.localName in ['a', 'button'])) {
      postStore.setCurrentCommentsList([], true);
      navigate(`/post/${postData.id}`, {
        state: { backgroundLocation: location.pathname },
      });
    }
  };

  return (
    <article className="post post_type_feed">
      <div
        className="post__wrapper"
        role="presentation"
        onClick={(e) => postClickHandler(e)}
      >
        <div className="post__avatar">
          <Link
            to={`/profile/${postData.user.login}`}
            className="post__avatar-link"
            style={{ backgroundImage: `url(${postData.user.id === userStore.user?.id ? userStore.user.avatar.url : postData.user.avatar.url})` }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div className="post__content-wrapper">
          <div className="post__heading">
            <Link
              to={`/profile/${postData.user.login}`}
              className="post__profile-link"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {postData.user.username}
            </Link>
            <div className="post__datetime" title={postData.createdAt.title}>{postData.createdAt.view}</div>
          </div>
          <div className="post__content">
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
      <div className="post__panel">
        <LikeButton postData={postData} />
        <CommentButton postData={postData} />
      </div>
    </article>
  );
};

export default observer(Post);
