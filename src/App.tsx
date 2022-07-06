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
import Feed from './components/Feed/Feed';
import LocationModal from './components/Modal/LocationModal';
import AuthRequired from './components/AuthRequired';
import Greeting from './components/Greeting/Greeting';
import SettingsForm from './components/SettingsForm/SettingsForm';
import { LocationStateProps, UserData } from './types/types';
import GlobalMask from './components/GlobalMask/GlobalMask';
import PostViewController from './components/PostViewController/PostViewController';
import withUrlParamsVerify from './hoc/withUrlParams/withUrlParams';
import Profile from './components/Profile/Profile';
import { ProfileProps } from './components/Profile/types';
import {useAppDispatch, useAppSelector} from './store/hooks';

const ProfileWithUrlParams = withUrlParamsVerify<ProfileProps>(Profile, {
  params: ['username'],
});

const App: FC = () => {
  const {
    appStore,
    userStore,
    modalStore,
    postStore,
  } = useContext(Context);
  const location = useLocation();

  const dispatch = useAppDispatch();
  // const activePostOptions = useAppSelector((state) => state.post.activePostOptions);
  // document.addEventListener('click', (): void => {
  //   if (activePostOptions) {
  //     dispatch(setActivePostOptions(null));
  //   }
  // });

  const locationState = location.state as LocationStateProps;

  console.log('app render');

  useEffect(() => {
    appStore.preloader();
  }, []);

  if (appStore.isFirstLoading) {
    return (<GlobalMask />);
  }

  if (locationState?.backgroundLocation) modalStore.setBodyUnscrollable(true);
  else modalStore.setBodyUnscrollable(false);

  const unauthorizedOnIndex = location.pathname === '/' && !userStore.isAuth;
  const layoutType = (locationState?.authRedirected || unauthorizedOnIndex) ? 'auth' : 'default';

  return (
    <>
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
                renderOnAuth={(userData: UserData) => (<Feed userData={userData} />)}
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
              <PostViewController />
            }
          />
          <Route
            path="profile/:username"
            element={(
              <ProfileWithUrlParams />
          )}
          />
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
                  // if (postStore.syncFunction) postStore.syncFunction();
                  // dispatch(asyncSyncPosts());
                }}
              >
                <PostViewController />
              </LocationModal>
            )}
          />
        </Routes>
      ) : ''}
    </>
  );
};

export default observer(App);
