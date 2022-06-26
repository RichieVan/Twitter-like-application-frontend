import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ToggleLoadingPayload } from './types';

const initialState: AppState = {
  isFirstLoading: true,
  isGlobalLoading: false,
  aliases: {
    static: '/assets',
  },
};

const appStore = createSlice({
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

export const { toggleFirstLoading, toggleGlobalLoading } = appStore.actions;

export default appStore.reducer;
