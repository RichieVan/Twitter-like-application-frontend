import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootWatcher from '../saga';
import userReducer from './reducers/userReducer/userReducer';
import formReducer from './reducers/formReducer/formReducer';
import appReducer from './reducers/appReducer/appReducer';
import postReducer from './reducers/postReducer/postReducer';
import feedReducer from './reducers/feedReducer/feedReducer';

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
