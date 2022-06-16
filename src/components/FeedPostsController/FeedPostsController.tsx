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
import PostService from '../../services/PostService';

const PostsListWithConditionalFeedback = withConditionalFeedback<PostData[], PostsListProps>({
  propName: 'postsData',
})(PostsList);

const FeedPostsController: FC = () => {
  const { postStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const syncFunction = (): void => {
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
      })
  }

  return (
    <PostsListWithConditionalFeedback
      data={postStore.feedPostsList}
      dataVerifyCallback={(data) => data.length > 0}
      canLoadMore={postStore.canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={postStore.syncing}
      isLoading={isLoading}
      loadingProps={{
        position: 'static',
      }}
      emptyMessagePrimary="Посты не найдены"
      emptyMessageSecondary="Вероятно, вы ни на кого не подписаны"
    />
  );
};

export default observer(FeedPostsController);
