import { observer } from 'mobx-react-lite';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Post from '../Post/Post';
import LoadingMask from '../LoadingMask';
import { Context } from '../../index';
import FormatPostText from '../../lib/formatPostText';

import PostsList from '../PostsList/PostsList';
import EmptyDataMessage from '../EmptyDataMessage/EmptyDataMessage';

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

  const loadMoreAction = () => new Promise((resolve, reject) => {
    postStore.loadMorePosts()
      .then((result) => {
        if (result) resolve();
        else reject(() => { postStore.setCanLoadMore(false); });
      });
  });

  const render = () => {
    if (posts?.length > 0) {
      return posts;
    }
    if (showLoading.current) {
      return (<LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={1} />);
    }
    return (
      <EmptyDataMessage>
        <b>Посты не найдены</b>
        <span>Вероятно, вы ни на кого не подписаны</span>
      </EmptyDataMessage>
    );
  };

  return (
    <PostsList
      canLoadMore={postStore.canLoadMore}
      loadMoreAction={loadMoreAction}
      isSyncing={postStore.syncing}
    >
      {render()}
    </PostsList>
  );
}

export default observer(FeedPostsList);
