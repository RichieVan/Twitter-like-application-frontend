import { observer } from 'mobx-react-lite';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import PostLoadMore from '../PostLoadMore';
import Post from '../Post';
import LoadingMask from '../../LoadingMask';
import { Context } from '../../../index';
import FormatPostText from '../../../lib/formatPostText';

import '../style.css';

function FeedPostsList() {
  const { postStore } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const showLoading = useRef(true);

  useEffect(() => {
    if (postStore.feedPostsList === null) {
      setPosts(null);
      showLoading.current = false;
      postStore.setCanChangeFeedType(true);
      return;
    }
    if (postStore.feedPostsList.length === 0) {
      postStore.fetchPosts()
        .then((data) => {
          postStore.setCurrentList({
            type: 'feed',
          });
          postStore.setFeedPostsList(data);
          setIsFirstLoading(false);
        });
    } else if (isFirstLoading) {
      postStore.syncPosts()
        .then((data) => {
          postStore.setFeedPostsList(data);
          setIsFirstLoading(false);
        });
    } else {
      setPosts(
        postStore.feedPostsList.map((val) => {
          const contentArray = FormatPostText(val.textContent);
          return (<Post key={val.id} id={val.id} options={val} contentArray={contentArray} />);
        }),
      );
      postStore.setCanChangeFeedType(true);
      showLoading.current = false;
    }
  }, [postStore.feedPostsList]);

  const render = () => {
    if (posts?.length > 0) {
      return posts;
    }
    if (showLoading.current) {
      return (<LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={1} />);
    }
    return (
      <div className="feed-no-data">
        <b>Посты не найдены</b>
        <span>Вероятно, вы ни на кого не подписаны</span>
      </div>
    );
  };

  return (
    <div className="posts-list">
      {render()}
      {postStore.canLoadMore && (
        <PostLoadMore action={() => new Promise((resolve, reject) => {
          postStore.loadMorePosts()
            .then((result) => {
              if (result) resolve();
              else reject(() => { postStore.setCanLoadMore(false); });
            });
        })}
        />
      )}
      {postStore.syncing && (<div className="syncing-mask" />)}
    </div>
  );
}

export default observer(FeedPostsList);
