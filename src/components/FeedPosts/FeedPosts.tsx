import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useContext,
  useEffect,
} from 'react';

import { Context } from '../../Context';
import FeedPostsList from '../FeedPostsList/FeedPostsList';

const FeedPosts: FC = () => {
  const { postStore } = useContext(Context);

  const syncFunction = () => {
    postStore.syncPosts();
  };

  useEffect(() => {
    postStore.setSyncFunction(syncFunction);
    if (!postStore.feedPostsList) {
      postStore.fetchPosts();
    }
  });

  const loadMoreAction = () => new Promise<boolean>((resolve) => {
    postStore
      .loadMorePosts()
      .then((result) => {
        postStore.setCanLoadMore(result);
        resolve(result);
      });
  });

  return (
    <FeedPostsList
      canLoadMore={postStore.canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={postStore.syncing}
      postsData={postStore.feedPostsList}
    />
  );
};

export default observer(FeedPosts);
