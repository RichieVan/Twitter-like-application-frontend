import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Context } from '../../Context';
import withConditionalFeedback from '../../hoc/withConditionalFeedback/withConditionalFeedback';
import PostService from '../../services/PostService';
import { PostData } from '../../types/types';
import PostsList from '../PostsList/PostsList';
import { PostsListProps } from '../PostsList/types';
import { ProfilePostsControllerProps } from './types';

const PostsListWithConditionalFeedback = withConditionalFeedback<PostData[], PostsListProps>({
  propName: 'postsData',
})(PostsList);

const ProfilePostsController: FC<ProfilePostsControllerProps> = ({
  userData,
}) => {
  const { postStore } = useContext(Context);
  const [postsData, setPostsData] = useState<PostData[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const lastPost = useRef<PostData | null>(null);

  const syncFunction = () => {
    if (lastPost.current) {
      setIsSyncing(true);
      PostService
        .syncUserPosts(userData.id, lastPost.current)
        .then(({ data }) => {
          setPostsData(data);
          lastPost.current = data[data.length - 1];
          setIsSyncing(false);
        });
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (postsData.length === 0) {
      PostService
        .getUserPosts(userData.id)
        .then(({ data }) => {
          if (isMounted) {
            const { posts } = data;
            lastPost.current = posts[posts.length - 1];
            postStore.setSyncFunction(syncFunction);
            setPostsData(posts);
            setIsLoading(false);
            setCanLoadMore(data.canLoadMore);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  });

  const loadMoreAction = () => new Promise<boolean>((resolve) => {
    if (lastPost.current) {
      postStore
        .loadMoreUserPosts(userData.id, lastPost.current)
        .then((data) => {
          const dataPosts = data.posts;
          lastPost.current = dataPosts[dataPosts.length - 1];
          setPostsData(postsData.concat(dataPosts));
          setCanLoadMore(data.canLoadMore);
          resolve(data.canLoadMore);
        });
    }
  });

  const postDeleteAction = (id: number): void => {
    PostService
      .deletePost(id)
      .then(({ data: deletedPostId }) => {
        setPostsData(postsData.filter(({ id: postId }) => postId !== deletedPostId));
        // show notification
      })
      .catch(() => {
        // show notification
      })
  }

  return (
    <PostsListWithConditionalFeedback
      data={postsData}
      dataVerifyCallback={(data) => data.length > 0}
      canLoadMore={canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={isSyncing}
      isLoading={isLoading}
      loadingProps={{
        position: 'static',
      }}
      emptyMessagePrimary="Посты не найдены"
      emptyMessageSecondary="Пользователь еще не оставил ни одного поста"
    />
  );
};

export default observer(ProfilePostsController);
