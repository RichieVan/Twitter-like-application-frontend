import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useEffect,
} from 'react';

import { useLocation } from 'react-router-dom';
import withConditionalFeedback from '../../hoc/withConditionalFeedback/withConditionalFeedback';
import { PostData } from '../../types/types';
import PostsList from '../PostsList/PostsList';
import { PostsListProps } from '../PostsList/types';
import PostService from '../../services/PostService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectFeedCanLoadMore,
  selectFeedLoading,
  selectFeedPosts, selectFeedSyncing,
} from '../../store/stores/feed/selectors';
import {
  asyncFeedSyncPosts,
  asyncFetchPosts,
  asyncLoadMorePosts,
  toggleLoading,
} from '../../store/stores/feed';

const PostsListWithConditionalFeedback = withConditionalFeedback<PostData[], PostsListProps>({
  propName: 'postsData',
})(PostsList);

const dataVerifyCallback = (data: PostData[]): boolean => data.length > 0;

const FeedPostsController: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectFeedPosts);
  const canLoadMore = useAppSelector(selectFeedCanLoadMore);
  const loading = useAppSelector(selectFeedLoading);
  const syncing = useAppSelector(selectFeedSyncing);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/feed') {
      dispatch(asyncFeedSyncPosts());
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(asyncFetchPosts());
    } else {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, posts]);

  const loadMoreAction = () => new Promise<boolean>(() => {
    dispatch(asyncLoadMorePosts());
    // postStore
    //   .loadMorePosts()
    //   .then((canLoad) => {
    //     postStore.setCanLoadMore(canLoad);
    //     resolve(canLoad);
    //   });
  });

  const postDeleteAction = (id: number): void => {
    PostService
      .deletePost(id)
      .then(({ data: deletedPostId }) => {
        // setPostsData(postsData.filter(({ id: postId }) => postId !== deletedPostId));
        // store value filter
        // show notification
      })
      .catch(() => {
        // show notification
      });
  };

  return (
    <PostsListWithConditionalFeedback
      data={posts}
      dataVerifyCallback={dataVerifyCallback}
      canLoadMore={canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={syncing}
      isLoading={loading}
      loadingProps={{
        position: 'static',
      }}
      emptyMessagePrimary="Посты не найдены"
      emptyMessageSecondary="Вероятно, вы ни на кого не подписаны"
    />
  );
};

export default observer(FeedPostsController);
