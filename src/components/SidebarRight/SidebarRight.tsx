import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';

import { Context } from '../../Context';
import { UserData } from '../../types/types';
import AuthForm from '../AuthForm/AuthForm';
import AuthRequired from '../AuthRequired';
import Sidebar from '../Sidebar/Sidebar';
import UserInfoPanel from '../UserInfoPanel/UserInfoPanel';

const SidebarRight: FC = () => {
  const { userStore } = useContext(Context);

  return (
    <Sidebar>
      <AuthRequired
        renderOnNotAuth={() => (<AuthForm />)}
        renderOnAuth={(userData: UserData) => (<UserInfoPanel userData={userData} />)}
      />
    </Sidebar>
  );
};

export default observer(SidebarRight);
