import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index.js';
import FastAverageColor from 'fast-average-color';
import { useLocation } from 'react-router-dom';
import ProfileStats from './ProfileStats';
import ProfileOptions from './ProfileOptions';
import ProfileInfo from './ProfileInfo';

const fac = new FastAverageColor();

const ProfileHeader = ({userData}) => {
    const {userStore} = useContext(Context);
    const [bgColor, setBgColor] = useState(null);

    fac.getColorAsync(userData.avatar.url)
    .then(color => {
        setBgColor(color.hex);
    });

    const avatarStyles = {
        backgroundImage : `url(${userData.avatar.url})`
    }

    const bgStyles = {
        backgroundColor : bgColor
    }

    return (
        <div className='pf-header-wrapper'>
            <div className="pf-header">
                <div className="header-bg" style={bgStyles}></div>
                <div className="user-info">
                    <div className="avatar" style={avatarStyles}></div>
                    <div className="info">
                        <div className="username">{userData.username}</div>
                        <div className="profile-tag">{`@${userData.login}`}</div>
                    </div>
                    <ProfileOptions userId={userData.id}/>
                </div>
            </div>
            <ProfileStats userData={userData}/>
            <ProfileInfo userData={userData}/>
        </div>
    );
}

export default observer(ProfileHeader);