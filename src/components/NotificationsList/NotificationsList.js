import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { Context } from '../../Context';
import Notification from '../Notification/Notification';

function NotificationsList() {
  const { notificationStore } = useContext(Context);

  const notifications = notificationStore.notifications.map((value) => {
    const {
      id,
      content,
      timeout,
      type,
    } = value;

    return (
      <Notification
        key={id}
        id={id}
        type={type}
        timeout={timeout}
      >
        {content}
      </Notification>
    );
  });

  return (
    <div className="notifications">
      {notifications}
    </div>
  );
}

export default observer(NotificationsList);
