import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { Context } from '../../Context';
import PostsList from '../PostsList/PostsList';

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

  const loadMoreAction = useCallback(() => new Promise<boolean>((resolve) => {
    postStore
      .loadMorePosts()
      .then((result) => {
        postStore.setCanLoadMore(result);
        resolve(result);
      });
  }), [postStore]);

  return (
    <PostsList
      postsData={postStore.feedPostsList}
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
