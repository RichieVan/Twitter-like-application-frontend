import { observer } from 'mobx-react-lite';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { Context } from '../../../index';
import FormatPostText from '../../../lib/formatPostText';
import LoadingMask from '../../LoadingMask';
import PostLoadMore from '../PostLoadMore';
import Post from '../Post';
import '../style.css';

function ProfilePostsList({ userData }) {
  const { postStore } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const lastPost = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (posts.length === 0) {
      postStore.getUserPosts(userData.id)
        .then((data) => {
          setCanLoadMore(data.canLoadMore);
          setPosts(
            data.posts.map((val, i, arr) => {
              if (i === arr.length - 1) lastPost.current = val;
              const contentArray = FormatPostText(val.textContent);
              return (<Post key={val.id} id={val.id} options={val} contentArray={contentArray} />);
            }),
          );
          setIsLoading(false);
        });
    } else if (location.pathname === `/profile/${userData.login}`) {
      postStore.syncUserPosts(userData.id, lastPost.current)
        .then((data) => {
          setPosts(
            data.map((val, i, arr) => {
              if (i === arr.length - 1) lastPost.current = val;
              const contentArray = FormatPostText(val.textContent);
              return (<Post key={val.id} id={val.id} options={val} contentArray={contentArray} />);
            }),
          );
        });
    }
  }, [location.pathname]);

  const render = () => {
    if (posts.length > 0) {
      return posts;
    }
    if (isLoading) {
      return (<LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={1} />);
    }
    return (
      <div className="feed-no-data">
        <b>Посты не найдены</b>
        <span>Этот пользователь еще не оставил ни одного :(</span>
      </div>
    );
  };

  return (
    <div className="posts-list">
      {render()}
      {canLoadMore && (
        <PostLoadMore action={() => new Promise((resolve, reject) => {
          postStore.loadMoreUserPosts(userData.id, lastPost.current)
            .then((data) => {
              setPosts(
                posts.concat(
                  data.posts.map((val, i, arr) => {
                    if (i === arr.length - 1) lastPost.current = val;
                    const contentArray = FormatPostText(val.textContent);
                    return (
                      <Post
                        key={val.id}
                        id={val.id}
                        options={val}
                        contentArray={contentArray}
                      />
                    );
                  }),
                ),
              );
              if (data.canLoadMore) resolve();
              else reject(() => { setCanLoadMore(data.canLoadMore); });
            });
        })}
        />
      )}
      {postStore.syncing && (<div className="syncing-mask" />)}
    </div>
  );
}

export default observer(ProfilePostsList);
