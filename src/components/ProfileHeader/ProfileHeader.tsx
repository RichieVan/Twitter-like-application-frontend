import React, { FC, useEffect, useState } from 'react';
import FastAverageColor from 'fast-average-color';

import ProfileUserInfo from '../ProfileUserInfo/ProfileUserInfo';
import { ProfileHeaderProps } from './types';

const fac = new FastAverageColor();

const ProfileHeader: FC<ProfileHeaderProps> = ({
  userData,
}) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    let isMounted = true;

    if (!bgColor) {
      fac
        .getColorAsync(userData.avatar.url)
        .then((color) => {
          if (isMounted) setBgColor(color.hex);
        });
    }

    return () => {
      isMounted = false;
    };
  });

  const bgStyles = {
    backgroundColor: bgColor,
  };

  return (
    <div className="profile-header">
      <div className="profile-header__background" style={bgStyles} />
      <ProfileUserInfo userData={userData} />
    </div>
  );
};

export default ProfileHeader;
