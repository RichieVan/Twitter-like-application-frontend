import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootWatcher from '../saga';
import userReducer from './stores/user';
import formReducer from './stores/form';
import appReducer from './stores/app';
import postReducer from './stores/post';
import feedReducer from './stores/feed';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    form: formReducer,
    post: postReducer,
    feed: feedReducer,
  },
  middleware: [
    sagaMiddleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
