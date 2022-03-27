import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Sidebar from '../Sidebar/Sidebar';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';

const SidebarLeft: FC = () => (
  <Sidebar>
    <SidebarNavigation />
  </Sidebar>
);

export default observer(SidebarLeft);
