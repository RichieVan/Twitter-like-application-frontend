import {
  take,
  takeEvery,
  takeLeading,
  takeLatest,
  call,
  put,
  all,
  fork,
  select,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BaseNewPostData, PostRequestParams } from '../types/types';
import PostService from '../services/PostService';
import ErrorHelper from '../helpers/ErrorHelper';
import {
  ASYNC_CREATE_POST,
} from '../store/reducers/postReducer/types';
import { toggleSyncing } from '../store/reducers/postReducer/postReducer';

// function* createPost({ payload }: PayloadAction<BaseNewPostData>) {
//   try {
//     yield put(toggleSyncing({ status: true }));
//     const requestParams: PostRequestParams = yield call(getPostsRequestData, true);
//     const { data }: Awaited<ReturnType<typeof PostService.create>> = yield call(
//       PostService.create,
//       {
//         ...payload,
//         params: requestParams,
//       },
//     );
//
//     yield put(setPosts({ posts: data }));
//     yield put(toggleSyncing({ status: false }));
//   } catch (e) {
//     yield put(toggleSyncing({ status: false }));
//     ErrorHelper.handleUnexpectedError();
//   }
// }
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

function* postWatcher() {
  // yield takeLeading(ASYNC_CREATE_POST, createPost);
  // yield takeLatest(ASYNC_SYNC_POSTS, syncPosts);
}

export default postWatcher;
