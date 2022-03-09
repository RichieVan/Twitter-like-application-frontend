import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/style.css';
import GlobalMask from './components/GlobalMask';
import NotificationsList from './components/notification/NotificationsList';
import ModalsList from './components/modal/ModalsList';
import SidebarRight from './components/sidebar/SidebarRight';
import SidebarLeft from './components/sidebar/SidebarLeft';

function Layout({ type = 'default' }) {
  const layoutsList = {
    auth: (
      <div className="greeting-container">
        <Outlet />
      </div>
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
    </div>
  );
}

export default observer(Layout);
