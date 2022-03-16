import React from 'react';
import { observer } from 'mobx-react-lite';

import Sidebar from '../Sidebar/Sidebar';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';

function SidebarLeft() {
  return (
    <Sidebar>
      <SidebarNavigation />
    </Sidebar>
  );
}

export default observer(SidebarLeft);
