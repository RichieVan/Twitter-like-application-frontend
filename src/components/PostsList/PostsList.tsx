import React, { FC } from 'react';

import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { PostsListProps } from './types';

const PostsList: FC<PostsListProps> = ({
  canLoadMore,
  loadMoreAction,
  isSyncing,
  children,
}) => (
  <div className="posts-list">
    {children}
    {canLoadMore && (<LoadMoreButton action={loadMoreAction} />)}
    {isSyncing && (<div className="posts-list__syncing" />)}
  </div>
);

export default PostsList;
