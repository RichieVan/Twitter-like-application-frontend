import React from 'react';

import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

function PostsList({
  canLoadMore,
  loadMoreAction,
  isSyncing,
  children,
}) {
  return (
    <div className="posts-list">
      {children}
      {canLoadMore && (<LoadMoreButton action={loadMoreAction} />)}
      {isSyncing && (<div className="posts-list__syncing" />)}
    </div>
  );
}

export default PostsList;
