import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useState,
  useContext,
  useEffect,
} from 'react';

import { Context } from '../../Context';
import withConditionalFeedback from '../../hoc/withConditionalFeedback/withConditionalFeedback';
import { PostData } from '../../types/types';
import PostsList from '../PostsList/PostsList';
import { PostsListProps } from '../PostsList/types';

const PostsListWithConditionalFeedback = withConditionalFeedback<PostData, PostsListProps>(PostsList, { propName: 'postsData' });

const FeedPostsController: FC = () => {
  const { postStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const syncFunction = () => {
    postStore.syncPosts();
  };

  useEffect(() => {
    postStore.setSyncFunction(syncFunction);
    if (postStore.feedPostsList.length === 0) {
      postStore
        .fetchPosts()
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [postStore]);

  const loadMoreAction = () => new Promise<boolean>((resolve) => {
    postStore
      .loadMorePosts()
      .then((canLoad) => {
        postStore.setCanLoadMore(canLoad);
        resolve(canLoad);
      });
  });

  return (
    <PostsListWithConditionalFeedback
      data={postStore.feedPostsList}
      canLoadMore={postStore.canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={postStore.syncing}
      isLoading={isLoading}
      emptyMessagePrimary="Посты не найдены"
      emptyMessageSecondary="Вероятно, вы ни на кого не подписаны"
    />
  );
};

export default observer(FeedPostsController);
