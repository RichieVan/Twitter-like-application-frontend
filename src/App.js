import React, { useContext, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import './styles/style.css'
import { Context } from './index.js';
import { observer } from 'mobx-react-lite';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import Layout from './Layout';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';
import LocationModal from './components/modal/LocationModal';
import ProfileSettings from './components/profile/settings/ProfileSettings';
import AuthRequired from './components/AuthRequired';
import Greeting from './components/Greeting';
import PostView from './components/feed/PostView';

const App = () => {
    const {appStore, userStore, modalStore, postStore} = useContext(Context);
    const location = useLocation();

    const locationState = location.state;

    useEffect(() => {
        console.log('app render');

        appStore.preloader()
            .then(() => {
                //urlStore.parseUrl();
            });
    }, [])

    if (appStore.isFirstLoading) {
        return (<p>Загрузка...</p>);
    }

    //<div><Link to='/games/stat'>Games</Link></div>

    // console.log(location);
    if (locationState?.backgroundLocation) {
        modalStore.setBodyUnscrollable(true);
    } else {
        modalStore.setBodyUnscrollable(false);
    }

    return (
        <div>
            <Routes location={locationState?.backgroundLocation || location}>
                <Route path='/' element={<Layout type={(locationState?.authRedirected || (location.pathname == '/' && !userStore.isAuth)) ? 'auth' : 'default'}/>}>
                    <Route path='/' element={
                        <AuthRequired element={<Greeting />}>
                            <Navigate to='/feed'/>
                        </AuthRequired>
                    }/>
                    <Route path='feed' element={
                        <AuthRequired to='/'>
                            <Feed />
                        </AuthRequired>
                    }/>
                    <Route 
                        path='profile/settings' 
                        element={
                            <AuthRequired to='/'>
                                <LocationModal heading='Настройки пользователя'>
                                    <ProfileSettings />
                                </LocationModal>
                            </AuthRequired>
                        }
                    />
                    <Route 
                        path='post/:id' 
                        element={
                            <PostView />
                        }
                    />
                    <Route path='profile/:username' element={<Profile />}/>
                    <Route path='*' element={<p>Ничего не найдено</p>}/>
                </Route>
            </Routes>

            {locationState?.backgroundLocation ? (
                <Routes>
                    <Route 
                        path='profile/settings' 
                        element={
                            <AuthRequired to='/'>
                                <LocationModal heading='Настройки пользователя'>
                                    <ProfileSettings />
                                </LocationModal>
                            </AuthRequired>
                        }
                    />
                    <Route 
                        path='post/:id' 
                        element={
                            <LocationModal type='post' position='start' onClose={() => {
                                if (postStore.currentList?.type == 'feed') postStore.syncPosts(true)
                            }}>
                                <PostView />
                            </LocationModal>
                        }
                    />
                </Routes>
            ) : ''}
        </div>
    )
}

export default observer(App);