import React, { useEffect, useContext } from 'react';
import './style.css';
import PostForm from './PostForm';
import FeedPostsList from './lists/FeedPostsList';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import FeedTypeChange from './FeedTypeChange';

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
