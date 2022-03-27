import React, { FC, useState } from 'react';
import FastAverageColor from 'fast-average-color';

import ProfileStats from '../ProfileStats/ProfileStats';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileUserInfo from '../ProfileUserInfo/ProfileUserInfo';
import { ProfileHeaderProps } from './types';

const fac = new FastAverageColor();

const ProfileHeader: FC<ProfileHeaderProps> = ({
  userData,
}) => {
  const [bgColor, setBgColor] = useState('');

  fac
    .getColorAsync(userData.avatar.url)
    .then((color) => {
      setBgColor(color.hex);
    });

  const bgStyles = {
    backgroundColor: bgColor,
  };

  return (
    <div className="profile-header">
      <div className="profile-header__wrapper">
        <div className="profile-header__background" style={bgStyles} />
        <ProfileUserInfo userData={userData} />
      </div>
      <ProfileStats userData={userData} />
      <ProfileInfo userData={userData} />
    </div>
  );
};

export default ProfileHeader;
