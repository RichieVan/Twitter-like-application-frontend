import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';

import { Context } from '../../Context';
import AuthForm from '../AuthForm/AuthForm';
import Sidebar from '../Sidebar/Sidebar';
import UserInfoPanel from '../UserInfoPanel/UserInfoPanel';

const SidebarRight: FC = () => {
  const { userStore } = useContext(Context);

  return (
    <Sidebar>
      {userStore.isAuth ? <UserInfoPanel /> : <AuthForm />}
    </Sidebar>
  );
};

export default observer(SidebarRight);
