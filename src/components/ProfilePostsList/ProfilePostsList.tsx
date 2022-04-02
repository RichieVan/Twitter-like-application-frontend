import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { Context } from '../../Context';
import formatPostText from '../../lib/formatPostText/formatPostText';
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
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const lastPost = useRef<PostData | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (posts.length === 0) {
      postStore
        .getUserPosts(userData.id)
        .then((data) => {
          setCanLoadMore(data.canLoadMore);
          setPosts(
            data.posts.map((val, i, arr) => {
              if (i === arr.length - 1) lastPost.current = val;
              const contentArray = formatPostText(val.textContent);
              return (<Post key={val.id} id={val.id} data={val} contentArray={contentArray} />);
            }),
          );
          setIsLoading(false);
        });
    } else if (location.pathname === `/profile/${userData.login}`) {
      postStore
        .syncUserPosts(userData.id, lastPost.current!)
        .then((data) => {
          setPosts(
            data.map((val, i, arr) => {
              if (i === arr.length - 1) lastPost.current = val;
              const contentArray = formatPostText(val.textContent);
              return (<Post key={val.id} id={val.id} data={val} contentArray={contentArray} />);
            }),
          );
        });
    }
  }, [location.pathname]);

  const loadMoreAction = () => new Promise<void>((resolve, reject) => {
    postStore
      .loadMoreUserPosts(userData.id, lastPost.current!)
      .then((data) => {
        setPosts(
          posts.concat(
            data.posts.map((val, i, arr) => {
              if (i === arr.length - 1) lastPost.current = val;
              const contentArray = formatPostText(val.textContent);
              return (
                <Post
                  key={val.id}
                  id={val.id}
                  data={val}
                  contentArray={contentArray}
                />
              );
            }),
          ),
        );
        if (data.canLoadMore) resolve();
        else reject(() => { setCanLoadMore(data.canLoadMore); });
      });
  });

  const render = () => {
    if (posts.length > 0) {
      return posts;
    }
    if (isLoading) {
      return (
        <LoadingMask
          size={50}
          bg="inherit"
          opacity={1}
        />
      );
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
      isSyncing={postStore.syncing}
    >
      {render()}
    </PostsList>
  );
};

export default observer(ProfilePostsList);
