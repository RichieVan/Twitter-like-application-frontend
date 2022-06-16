import {
  takeLeading,
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
} from '../store/reducers/feedReducer/selectors';
import {
  loadMorePostsSuccess,
  fetchPostsSuccess,
} from '../store/reducers/feedReducer/feedReducer';
import getPostQueryParams from '../lib/getPostQueryParams/getPostQueryParams';
import {
  ASYNC_FETCH_POSTS,
  ASYNC_LOAD_MORE_POSTS,
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

// function* syncPosts() {
//   const feedPosts: ReturnType<typeof selectFeedPosts> = yield select(selectFeedPosts);
//   const firstLoaded: ReturnType<typeof selectFirstLoaded> = yield select(selectFirstLoaded);
//
//   if (feedPosts.length > 0 && firstLoaded) {
//     yield put(toggleSyncing({ status: true }));
//     const requestParams: PostRequestParams = yield call(getPostsRequestData, true);
//     const { data }: Awaited<ReturnType<typeof PostService.syncPosts>> = yield call(
//       PostService.syncPosts,
//       requestParams,
//     );
//
//     yield put(setFeedPosts({ posts: data }));
//     yield put(toggleSyncing({ status: false }));
//   }
//   yield put(toggleSyncing({ status: false }));
// }

// function* deletePost({ payload: { id } }: PayloadAction<DeletePostPayload>) {
//   try {
//     const { data }: Awaited<ReturnType<typeof PostService.deletePost>> = yield call(
//       PostService.deletePost,
//       id,
//     );
//     yield put(deletePostSuccess({ id: data }));
//   } catch (e) {
//     ErrorHelper.handleUnexpectedError();
//   }
// }

function* postWatcher() {
  yield takeLatest(ASYNC_FETCH_POSTS, fetchPosts);
  yield takeLeading(ASYNC_LOAD_MORE_POSTS, loadMorePosts);
  // yield takeLatest(ASYNC_SYNC_POSTS, syncPosts);
}

export default postWatcher;
