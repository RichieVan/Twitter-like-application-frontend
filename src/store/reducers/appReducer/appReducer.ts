import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, SetActivePostOptionsPayload, ToggleLoadingPayload } from './types';

const initialState: AppState = {
  isFirstLoading: true,
  isGlobalLoading: false,
  activePostOptions: null,
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
    setActivePostOptions: (
      state,
      {
        payload: { optionsType },
      }: PayloadAction<SetActivePostOptionsPayload>,
    ) => ({
      ...state,
      activePostOptions: optionsType,
    }),
  },
});

export const { toggleFirstLoading, toggleGlobalLoading } = appSlice.actions;

export default appSlice.reducer;
