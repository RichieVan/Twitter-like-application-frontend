import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationClearPayload, NotificationShowPayload, NotificationState } from './types';

const initialState: NotificationState = {
  notifications: [],
  idCounter: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, {
      payload: {
        content,
        timeout,
        type,
      },
    }: PayloadAction<NotificationShowPayload>) => {
      const { notifications, idCounter } = state;
      const notification = {
        id: idCounter,
        content,
        timeout,
        type,
      };
      const incrementedIdCounter = idCounter + 1;

      return {
        ...state,
        notifications: [
          ...notifications,
          notification,
        ],
        idCounter: incrementedIdCounter,
      };
    },
    clearNotification: (state, { payload: { id } }: PayloadAction<NotificationClearPayload>) => ({
      ...state,
      notifications: state.notifications.filter((item) => item.id !== id),
    }),
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
