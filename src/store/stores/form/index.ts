import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormErrors, FormsState } from './types';

const initialState: FormsState = {
  login: {
    errors: [],
  },
  registration: {
    errors: [],
  },
};

const formStore = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setLoginErrors: (state, { payload }: PayloadAction<FormErrors>): FormsState => ({
      ...state,
      login: {
        ...state.login,
        errors: payload,
      },
    }),
    setRegistrationErrors: (state, { payload }: PayloadAction<FormErrors>): FormsState => ({
      ...state,
      registration: {
        ...state.login,
        errors: payload,
      },
    }),
  },
});

export const { setLoginErrors, setRegistrationErrors } = formStore.actions;

export default formStore.reducer;
