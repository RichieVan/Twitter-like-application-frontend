import React, { FC } from 'react';
import formatPostText from '../../lib/formatPostText/formatPostText';

import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Post from '../Post/Post';
import { PostsListProps } from './types';

const PostsList: FC<PostsListProps> = ({
  postsData = [],
  canLoadMore,
  loadMoreAction,
  isSyncing,
}) => {
  const posts = postsData.map((val) => {
    const contentArray = formatPostText(val.textContent);
    return (<Post key={val.id} data={val} />);
  });

  return (
    <div className="posts-list">
      {posts}
      {canLoadMore && (<LoadMoreButton action={loadMoreAction} />)}
      {isSyncing && (<div className="posts-list__syncing" />)}
    </div>
  );
};

export default PostsList;
