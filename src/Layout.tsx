import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import GlobalMask from './components/GlobalMask/GlobalMask';
import NotificationsList from './components/NotificationsList/NotificationsList';
import ModalsList from './components/ModalsList/ModalsList';
import SidebarRight from './components/SidebarRight/SidebarRight';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import { LayoutProps } from './types/types';
import Scroll from './components/Scroll/Scroll';

const Layout: FC<LayoutProps> = ({
  type = 'default',
}) => {
  const layoutsList = {
    auth: (
      <Outlet />
    ),
    default: (
      <main className="container">
        <div className="row application-wrapper">
          <div className="col-3">
            <SidebarLeft />
          </div>
          <div className="col-6">
            <Outlet />
          </div>
          <div className="col-3">
            <SidebarRight />
          </div>
        </div>
      </main>
    ),
  };

  return (
    <div className="app">
      {layoutsList[type]}
      <ModalsList />
      <NotificationsList />
      <GlobalMask />
      <Scroll />
    </div>
  );
};

export default observer(Layout);
