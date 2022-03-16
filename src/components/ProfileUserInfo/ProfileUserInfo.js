import React from 'react';

function ProfileUserInfo({ userData }) {
  const avatarStyles = {
    backgroundImage: `url(${userData.avatar.url})`,
  };

  return (
    <div className="profile-user-info">
      <div className="profile-user-info__avatar" style={avatarStyles} />
      <div className="profile-user-info__wrapper">
        <div className="profile-user-info__username">{userData.username}</div>
        <div className="profile-user-info__profile-tag">{`@${userData.login}`}</div>
      </div>
    </div>
  );
}

export default ProfileUserInfo;
