import React, { useEffect, useContext, FC } from 'react';
import { observer } from 'mobx-react-lite';

import PostForm from '../PostForm/PostForm';
import { Context } from '../../Context';
import FeedTypeChange from '../FeedTypeChange/FeedTypeChange';
import FeedPostsController from '../FeedPostsController/FeedPostsController';

const Feed: FC = () => {
  const { postStore } = useContext(Context);

  useEffect(() => {
    document.title = 'Главная';
  });

  return (
    <div className="feed">
      <PostForm />
      <FeedTypeChange />
      <FeedPostsController key={postStore.feedType} />
    </div>
  );
};

export default observer(Feed);
