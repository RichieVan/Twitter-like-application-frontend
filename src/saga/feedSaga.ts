import {
  takeLeading,
  takeEvery,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { PostRequestParams } from '../types/types';
import PostService from '../services/PostService';
import ErrorHelper from '../helpers/ErrorHelper';
import {
  selectFeedType,
  selectFeedFirstLoaded,
  selectFeedPosts,
} from '../store/reducers/feedReducer/selectors';
import {
  setPosts,
  toggleSyncing,
  toggleLoading,
  fetchPostsSuccess,
  loadMorePostsSuccess,
} from '../store/reducers/feedReducer/feedReducer';
import getPostQueryParams from '../lib/getPostQueryParams/getPostQueryParams';
import {
  FEED_FETCH_POSTS,
  FEED_LOAD_MORE_POSTS,
  FEED_SYNC_POSTS,
} from '../store/reducers/feedReducer/types';

function* getPostsRequestData(withFeedType: boolean) {
  const fromPost: ReturnType<typeof selectFeedFirstLoaded> = yield select(selectFeedFirstLoaded);
  const requestObject: PostRequestParams = yield call(getPostQueryParams, fromPost);

  if (withFeedType) {
    const feedType: ReturnType<typeof selectFeedType> = yield select(selectFeedType);
    requestObject.forSubs = feedType === 'subs';
  }

  return requestObject;
}

function* fetchPosts() {
  try {
    yield put(toggleLoading(true));
    const feedType: ReturnType<typeof selectFeedType> = yield select(selectFeedType);
    const {
      data: {
        posts,
        canLoadMore,
      },
    }: Awaited<ReturnType<typeof PostService.getFeed>> = yield call(
      PostService.getFeed,
      {
        forSubs: feedType === 'subs',
      },
    );

    yield put(fetchPostsSuccess({
      posts,
      canLoadMore,
      canChangeType: true,
    }));
  } catch (e) {
    ErrorHelper.handleUnexpectedError();
  } finally {
    yield put(toggleLoading(false));
  }
}

function* loadMorePosts() {
  const requestParams: PostRequestParams = yield call(getPostsRequestData, true);
  const {
    data: {
      posts,
      canLoadMore,
    },
  }: Awaited<ReturnType<typeof PostService.loadMore>> = yield call(
    PostService.loadMore,
    { ...requestParams },
  );

  yield put(loadMorePostsSuccess({ posts, canLoadMore }));
}

function* syncFeedPosts() {
  const feedPosts: ReturnType<typeof selectFeedPosts> = yield select(selectFeedPosts);
  const firstLoaded: ReturnType<typeof selectFeedFirstLoaded> = yield select(selectFeedFirstLoaded);

  if (feedPosts.length > 0 && firstLoaded) {
    yield put(toggleSyncing(true));
    const requestParams: PostRequestParams = yield call(getPostsRequestData, true);
    const { data }: Awaited<ReturnType<typeof PostService.syncPosts>> = yield call(
      PostService.syncPosts,
      requestParams,
    );

    yield put(setPosts(data));
  }
  yield put(toggleSyncing(false));
}

function* feedWatcher() {
  yield takeLatest(FEED_FETCH_POSTS, fetchPosts);
  yield takeLeading(FEED_LOAD_MORE_POSTS, loadMorePosts);
  yield takeEvery(FEED_SYNC_POSTS, syncFeedPosts);
}

export default feedWatcher;
