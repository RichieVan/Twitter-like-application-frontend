import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { Context } from '../..';
import AuthForm from '../AuthForm/AuthForm';
import Sidebar from '../Sidebar/Sidebar';
import UserInfoPanel from '../UserInfoPanel/UserInfoPanel';

function SidebarRight() {
  const { userStore } = useContext(Context);

  return (
    <Sidebar>
      {userStore.isAuth ? <UserInfoPanel /> : <AuthForm />}
    </Sidebar>
  );
}

export default observer(SidebarRight);
