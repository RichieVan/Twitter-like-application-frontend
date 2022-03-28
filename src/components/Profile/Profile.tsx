import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ProfileParams } from './types';
import ProfileContent from '../ProfileContent/ProfileContent';

const Profile: FC = () => {
  const params = useParams<ProfileParams>();

  if (!params.username) {
    return (
      <Navigate to="/feed" />
    );
  }

  return (
    <ProfileContent
      key={params.username}
      username={params.username}
    />
  );
};

export default Profile;
