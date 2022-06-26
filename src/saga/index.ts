import { all } from 'redux-saga/effects';
import userWatcher from './userSaga';
import feedWatcher from './feedSaga';
import postWatcher from './postSaga';

function* rootWatcher() {
  yield all([
    userWatcher(),
    postWatcher(),
    feedWatcher(),
  ]);
}

export default rootWatcher;
