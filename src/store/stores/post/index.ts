import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import {
  PostState, SetActivePostOptionsPayload,
} from './types';

const initialState: PostState = {
  activePostOptions: null,
};

const postStore = createSlice({
  name: 'post',
  initialState,
  reducers: {
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

export const {
  setActivePostOptions,
} = postStore.actions;

export default postStore.reducer;
