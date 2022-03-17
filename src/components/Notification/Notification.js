import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../../Context';

function Notification({
  id,
  type,
  timeout,
  children,
}) {
  const { notificationStore } = useContext(Context);
  const [fadingOut, setFadingOut] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [containerClassArray, setClassList] = useState(['notification', `notification_type_${type}`]);

  useEffect(() => {
    if (!fadingIn) {
      setFadingIn(true);
      setClassList(containerClassArray.concat(['notification_fading_in']));

      setTimeout(() => {
        setTimeout(() => {
          setFadingOut(true);
        }, timeout);
      }, 300);
    }

    if (fadingOut) {
      setFadingOut(false);
      setClassList(containerClassArray.filter((item) => item !== 'notification_fading_in').concat(['notification_fading_out']));

      setTimeout(() => {
        notificationStore.clear(id);
      }, 500);
    }
  });

  const iconNames = {
    info: faInfo,
    success: faCheck,
    error: faTimes,
  };
  const containerClassList = containerClassArray.join(' ');

  return (
    <div className={containerClassList}>
      <div className="notification__content">
        <div className="notification__icon">
          <FontAwesomeIcon icon={iconNames[type]} />
        </div>
        <p className="notification__text">{children}</p>
      </div>
    </div>
  );
}

export default observer(Notification);
