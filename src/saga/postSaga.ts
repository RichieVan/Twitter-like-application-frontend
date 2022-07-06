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
import { PostRequestParams } from '../types/types';
import PostService from '../services/PostService';
import ErrorHelper from '../helpers/ErrorHelper';
import {
  POST_CREATE,
} from '../store/stores/post/types';

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
//   yield put(toggleSyncing(true));
//   const syncFunction: ReturnType<typeof selectPostSyncFunction> = yield select(
//     selectPostSyncFunction,
//   );
//   if (syncFunction) {
//     yield call(syncFunction);
//   }
//   yield put(toggleSyncing(false));
// }

function* postWatcher() {
  // yield takeLatest(POST_SYNC, syncPosts);
  // yield takeLatest(ASYNC_SYNC_POSTS, syncPosts);
}

export default postWatcher;
