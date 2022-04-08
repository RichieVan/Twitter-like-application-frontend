import React, { FC } from 'react';
import formatPostText from '../../lib/formatPostText/formatPostText';
import EmptyDataMessage from '../EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../LoadingMask/LoadingMask';
import Post from '../Post/Post';
import PostsList from '../PostsList/PostsList';
import { FeedPostsListProps } from './types';

const FeedPostsList: FC<FeedPostsListProps> = ({
  canLoadMore,
  loadMoreAction,
  postsData,
  isSyncing,
}) => {
  let posts: JSX.Element[] | null = null;
  if (postsData) {
    posts = postsData.map((val) => {
      const contentArray = formatPostText(val.textContent);
      return (<Post key={val.id} id={val.id} data={val} contentArray={contentArray} />);
    });
  }

  const render = () => {
    if (posts && posts.length > 0) {
      return posts;
    }

    if (posts && posts.length === 0) {
      return (
        <EmptyDataMessage>
          <b>Посты не найдены</b>
          <span>Вероятно, вы ни на кого не подписаны</span>
        </EmptyDataMessage>
      );
    }

    return (
      <LoadingMask
        size={50}
        bg="inherit"
        opacity={1}
      />
    );
  };

  return (
    <PostsList
      canLoadMore={canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={isSyncing}
    >
      {render()}
    </PostsList>
  );
};

export default FeedPostsList;
