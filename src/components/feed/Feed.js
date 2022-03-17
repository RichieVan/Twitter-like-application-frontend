import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import PostForm from '../PostForm/PostForm';
import FeedPostsList from '../FeedPostsList/FeedPostsList';
import { Context } from '../../Context';
import FeedTypeChange from '../FeedTypeChange/FeedTypeChange';

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
