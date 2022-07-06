import { all, call, put } from 'redux-saga/effects';
import { toggleFirstLoading, toggleGlobalLoading } from '../store/stores/app';
import TokenService from '../services/TokenService';
import { checkAuthorization } from './userSaga';

function* preload() {
  yield put(toggleGlobalLoading({ status: true }));

  if (TokenService.getAccessToken()) {
    yield call(checkAuthorization);
  }

  // @TODO вынести в компонент App
  // document.addEventListener('click', () => {
  //   yield put(setActivePostOptions({ optionsType: null }));
  // });

  yield put(toggleFirstLoading({ status: false }));
  yield put(toggleGlobalLoading({ status: true }));
}

export default function* appWatcher() {
  yield all([
    preload(),
  ]);
}
