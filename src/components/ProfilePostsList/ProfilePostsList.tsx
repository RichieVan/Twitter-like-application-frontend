import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Context } from '../../Context';
import formatPostText from '../../lib/formatPostText/formatPostText';
import PostService from '../../services/PostService';
import { PostData } from '../../types/types';
import EmptyDataMessage from '../EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../LoadingMask/LoadingMask';
import Post from '../Post/Post';
import PostsList from '../PostsList/PostsList';
import { ProfilePostsListProps } from './types';

const ProfilePostsList: FC<ProfilePostsListProps> = ({
  userData,
}) => {
  const { postStore } = useContext(Context);
  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const lastPost = useRef<PostData | null>(null);

  const syncFunction = () => {
    if (lastPost.current) {
      setIsSyncing(true);
      PostService
        .syncUserPosts(userData.id, lastPost.current)
        .then(({ data }) => {
          setPosts(data);
          lastPost.current = data[data.length - 1];
          setIsSyncing(false);
        });
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (!posts) {
      PostService
        .getUserPosts(userData.id)
        .then(({ data }) => {
          if (isMounted) {
            setCanLoadMore(data.canLoadMore);
            const dataPosts = data.posts;
            setPosts(dataPosts);
            lastPost.current = dataPosts[dataPosts.length - 1];
            postStore.setSyncFunction(syncFunction);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  });

  const loadMoreAction = () => new Promise<boolean>((resolve) => {
    if (posts && lastPost.current) {
      postStore
        .loadMoreUserPosts(userData.id, lastPost.current)
        .then((data) => {
          const dataPosts = data.posts;
          setPosts(posts.concat(dataPosts));
          lastPost.current = dataPosts[dataPosts.length - 1];
          setCanLoadMore(data.canLoadMore);
          resolve(data.canLoadMore);
        });
    }
  });

  const render = () => {
    if (!posts) {
      return (
        <LoadingMask
          size={50}
          bg="inherit"
          opacity={1}
        />
      );
    }

    if (posts.length > 0) {
      const result = posts.map((val) => {
        const contentArray = formatPostText(val.textContent);
        return (<Post key={val.id} id={val.id} data={val} contentArray={contentArray} />);
      });
      return result;
    }

    return (
      <EmptyDataMessage>
        <b>Посты не найдены</b>
        <span>Этот пользователь еще не оставил ни одного поста</span>
      </EmptyDataMessage>
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

export default observer(ProfilePostsList);
