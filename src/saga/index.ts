import { all } from 'redux-saga/effects';
import userWatcher from './userSaga';
import postWatcher from './feedSaga';

function* rootWatcher() {
  yield all([userWatcher(), postWatcher()]);
}

export default rootWatcher;
