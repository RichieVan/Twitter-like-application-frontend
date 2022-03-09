import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import './style.css';
import { Context } from '../..';
import Notification from './Notification';

function NotificationsList() {
  const { notificationStore } = useContext(Context);

  return (
    <div className="notifications">
      {notificationStore.notifications.map((value) => {
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
      })}
    </div>
  );
}

export default observer(NotificationsList);
