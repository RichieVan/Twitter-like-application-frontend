import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePostsList from '../ProfilePostsList/ProfilePostsList';
import LoadingMask from '../LoadingMask/LoadingMask';
import { Context } from '../../Context';

function Profile() {
  const { userStore } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const params = useParams();

  if (userData?.login !== params.username) {
    if (userData !== null) {
      setUserData(null);
      return (
        <div className="profile">
          <LoadingMask cHeight={70} cWidth={70} bg="#0f0f0f" opacity={0.8} />
        </div>
      );
    }

    if (params.username === userStore.user.login) setUserData(userStore.user);
    else {
      userStore
        .getUserData(params.username)
        .then((result) => setUserData(result));
    }

    document.title = `Профиль пользователя ${params.username}`;
  }

  if (!userData) {
    return (
      <div className="profile">
        <LoadingMask cHeight={70} cWidth={70} bg="#0f0f0f" opacity={0.8} />
      </div>
    );
  }

  const validUserData = (params.username === userStore.user.login) ? userStore.user : userData;
  return (
    <div className="profile">
      <ProfileHeader userData={validUserData} />
      <ProfilePostsList key={userData.id} userData={userData} />
    </div>
  );
}

export default observer(Profile);
