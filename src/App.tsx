import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { Context } from './Context';
import Layout from './Layout';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';
import LocationModal from './components/Modal/LocationModal';
import AuthRequired from './components/AuthRequired';
import Greeting from './components/Greeting/Greeting';
import PostView from './components/PostView/PostView';
import SettingsForm from './components/SettingsForm/SettingsForm';
import { LocationStateProps, UserData } from './types/types';

const App: FC = () => {
  const {
    appStore,
    userStore,
    modalStore,
    postStore,
  } = useContext(Context);
  const location = useLocation();

  const locationState = location.state as LocationStateProps;

  useEffect(() => {
    appStore.preloader();
  }, []);

  if (appStore.isFirstLoading) {
    return (<p>Загрузка...</p>);
  }

  if (locationState?.backgroundLocation) modalStore.setBodyUnscrollable(true);
  else modalStore.setBodyUnscrollable(false);

  const unauthorizedOnIndex = location.pathname === '/' && !userStore.isAuth;
  const layoutType = (locationState?.authRedirected || unauthorizedOnIndex) ? 'auth' : 'default';

  return (
    <div>
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path="/" element={<Layout type={layoutType} />}>
          <Route
            path="/"
            element={(
              <AuthRequired
                renderOnNotAuth={() => (<Greeting />)}
                renderOnAuth={() => (<Navigate to="/feed" />)}
              />
            )}
          />
          <Route
            path="feed"
            element={(
              <AuthRequired
                renderOnNotAuth={() => (<Navigate to="/" />)}
                renderOnAuth={() => (<Feed />)}
              />
            )}
          />
          <Route
            path="profile/settings"
            element={(
              <AuthRequired
                renderOnNotAuth={() => (<Navigate to="/" />)}
                renderOnAuth={(userData: UserData) => (
                  <LocationModal heading="Настройки пользователя">
                    <SettingsForm userData={userData} />
                  </LocationModal>
                )}
              />
            )}
          />
          <Route
            path="post/:id"
            element={
              <PostView />
            }
          />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="*" element={<p>Ничего не найдено</p>} />
        </Route>
      </Routes>

      {locationState?.backgroundLocation ? (
        <Routes>
          <Route
            path="profile/settings"
            element={(
              <AuthRequired
                renderOnNotAuth={() => (<Navigate to="/" />)}
                renderOnAuth={(userData: UserData) => (
                  <LocationModal heading="Настройки пользователя">
                    <SettingsForm userData={userData} />
                  </LocationModal>
                )}
              />
            )}
          />
          <Route
            path="post/:id"
            element={(
              <LocationModal
                type="post"
                position="start"
                onClose={() => {
                  if (postStore.currentList?.type === 'feed') postStore.syncPosts(true);
                }}
              >
                <PostView />
              </LocationModal>
            )}
          />
        </Routes>
      ) : ''}
    </div>
  );
};

export default observer(App);
