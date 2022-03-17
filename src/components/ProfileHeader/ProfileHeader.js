import React, { useState } from 'react';
import FastAverageColor from 'fast-average-color';

import ProfileStats from '../ProfileStats/ProfileStats';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileUserInfo from '../ProfileUserInfo/ProfileUserInfo';

const fac = new FastAverageColor();

function ProfileHeader({ userData }) {
  const [bgColor, setBgColor] = useState(null);

  fac.getColorAsync(userData.avatar.url)
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
}

export default ProfileHeader;
