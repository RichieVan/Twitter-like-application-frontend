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

  useEffect(() => {
    if (!postStore.feedPostsList) {
      postStore.fetchPosts();
    }
  });

  const loadMoreAction = () => new Promise<void>((resolve, reject) => {
    postStore
      .loadMorePosts()
      .then((result) => {
        if (result) resolve();
        else reject(() => { postStore.setCanLoadMore(false); });
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
