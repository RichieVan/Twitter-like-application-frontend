import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ToggleLoadingPayload } from './types';

const initialState: AppState = {
  isFirstLoading: true,
  isGlobalLoading: false,
  aliases: {
    static: '/assets',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleFirstLoading: (
      state,
      {
        payload: { status },
      }: PayloadAction<ToggleLoadingPayload>,
    ) => ({
      ...state,
      isFirstLoading: status,
    }),
    toggleGlobalLoading: (
      state,
      {
        payload: { status },
      }: PayloadAction<ToggleLoadingPayload>,
    ) => ({
      ...state,
      isGlobalLoading: status,
    }),
  },
});

export const { toggleFirstLoading, toggleGlobalLoading } = appSlice.actions;

export default appSlice.reducer;
