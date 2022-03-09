import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import './style.css';
import { Context } from '../..';
import ProfileSb from './ProfileSb';
import AuthForm from '../profile/AuthForm';

function SidebarRight() {
  const { userStore } = useContext(Context);

  return (
    <div className="sidebar-right">
      {userStore.isAuth ? <ProfileSb /> : <AuthForm />}
    </div>
  );
}

export default observer(SidebarRight);
