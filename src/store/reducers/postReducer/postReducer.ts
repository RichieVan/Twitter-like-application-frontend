import {
  Action, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import {
  POST_SYNC,
  PostState, SetActivePostOptionsPayload,
  ToggleSyncingPayload,
} from './types';

const initialState: PostState = {
  syncing: false,
  syncFunction: null,
  activePostOptions: null,
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
    setActivePostOptions: (
      state,
      {
        payload,
      }: PayloadAction<SetActivePostOptionsPayload>,
    ) => ({
      ...state,
      activePostOptions: payload,
    }),
  },
});

export const asyncSyncPosts = (): Action => ({
  type: POST_SYNC,
});

export const {
  toggleSyncing,
  setActivePostOptions,
} = postSlice.actions;

export default postSlice.reducer;
