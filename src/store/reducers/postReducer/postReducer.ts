import {
  Action, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import {
  ASYNC_SYNC_POSTS,
  PostState,
  ToggleSyncingPayload,
} from './types';

const initialState: PostState = {
  syncing: false,
  syncFunction: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleSyncing: (state, { payload: { status } }: PayloadAction<ToggleSyncingPayload>) => ({
      ...state,
      syncing: status,
    }),
    // deletePostSuccess: (state, { payload: { id } }: PayloadAction<DeletePostPayload>) => ({
    //   ...state,
    //   feedPostsList: state.feedPostsList.filter((postData) => postData.id !== id),
    // }),
  },
});

export const asyncSyncPosts = (): Action => ({
  type: ASYNC_SYNC_POSTS,
});

export const {
  toggleSyncing,
} = postSlice.actions;

export default postSlice.reducer;
