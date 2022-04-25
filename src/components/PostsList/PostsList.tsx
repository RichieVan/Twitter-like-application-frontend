import React, { FC } from 'react';
import formatPostText from '../../lib/formatPostText/formatPostText';
import EmptyDataMessage from '../EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../LoadingMask/LoadingMask';

import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Post from '../Post/Post';
import { PostsListProps } from './types';

const PostsList: FC<PostsListProps> = ({
  postsData,
  canLoadMore,
  loadMoreAction,
  isSyncing,
  isLoading,
  emptyMessagePrimary,
  emptyMessageSecondary = '',
}) => {
  const posts = postsData.map((val) => {
    const contentArray = formatPostText(val.textContent);
    return (<Post key={val.id} id={val.id} data={val} contentArray={contentArray} />);
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingMask
          size={50}
          bg="inherit"
          opacity={1}
        />
      );
    }

    if (posts.length > 0) {
      return posts;
    }

    return (
      <EmptyDataMessage
        primary={emptyMessagePrimary}
        secondary={emptyMessageSecondary}
      />
    );
  };

  return (
    <div className="posts-list">
      {renderContent()}
      {canLoadMore && (<LoadMoreButton action={loadMoreAction} />)}
      {isSyncing && (<div className="posts-list__syncing" />)}
    </div>
  );
};

export default PostsList;
