import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import './style.css';
import { Context } from '../../index.js';
import ProfileHeader from './ProfileHeader';
import ProfilePostsList from '../feed/lists/ProfilePostsList';
import LoadingMask from '../LoadingMask';

function Profile() {
  const { userStore } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const params = useParams();

  // useEffect(() => {
  //     if (userData?.login != params.username) {
  //         userStore.getUserData(params.username).then((result) => {
  //             setUserData(result);
  //         })
  //         if (params.username == userStore.user.login) setUserData(userStore.user);

  //         document.title = 'Профиль пользователя ' + params.username;
  //     }
  // },
  // //[userStore.user, location.pathname]
  // )

  if (userData?.login !== params.username) {
    if (userData !== null) {
      setUserData(null);
      return (
        <div className="pf-container">
          <LoadingMask cHeight={70} cWidth={70} bg="#0f0f0f" opacity={0.8} />
        </div>
      );
    }

    if (params.username === userStore.user.login) setUserData(userStore.user);
    else {
      userStore.getUserData(params.username).then((result) => {
        setUserData(result);
      });
    }

    document.title = `Профиль пользователя ${params.username}`;
  }

  if (!userData) {
    return (
      <div className="pf-container">
        <LoadingMask cHeight={70} cWidth={70} bg="#0f0f0f" opacity={0.8} />
      </div>
    );
  }

  const validUserData = (params.username === userStore.user.login) ? userStore.user : userData;
  return (
    <div className="pf-container">
      <ProfileHeader userData={validUserData} />
      <ProfilePostsList key={userData.id} userData={userData} />
    </div>
  );
}

export default observer(Profile);
