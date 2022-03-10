import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import './style.css';
import PostForm from '../postForm/PostForm';
import FeedPostsList from '../FeedPostsList/FeedPostsList';
import { Context } from '../..';
import FeedTypeChange from '../feedTypeChange/FeedTypeChange';

function Feed() {
  const { postStore } = useContext(Context);

  useEffect(() => {
    document.title = 'Главная';
  });

  return (
    <div className="feed">
      <PostForm />
      <FeedTypeChange />
      <FeedPostsList key={postStore.feedType} />
    </div>
  );
}

export default observer(Feed);
