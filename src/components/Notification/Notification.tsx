import { observer } from 'mobx-react-lite';
import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../../Context';
import { NotificationProps } from './types';
import getClassList from '../../lib/getClassList/getClassList';

const Notification: FC<NotificationProps> = ({
  id,
  timeout,
  type = 'info',
  children,
}) => {
  const { notificationStore } = useContext(Context);
  const [fadingOut, setFadingOut] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [mods, setMods] = useState<string[]>([`type_${type}`]);
  const hideTimeout = useRef<null | NodeJS.Timeout>(null);

  const fadingOutAction = () => {
    setFadingOut(false);
    setMods(mods.filter((item) => item !== 'fading_in').concat(['fading_out']));
    setTimeout(() => {
      notificationStore.clear(id);
    }, 500);
  };

  const closeAction = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;

      fadingOutAction();
    }
  };

  useEffect(() => {
    if (!fadingIn) {
      setFadingIn(true);
      setMods(mods.concat(['fading_in']));

      setTimeout(() => {
        hideTimeout.current = setTimeout(() => {
          setFadingOut(true);
        }, timeout);
      }, 300);
    }

    if (fadingOut) fadingOutAction();
  });

  const iconNames = {
    info: faInfo,
    success: faCheck,
    error: faTimes,
  };
  const classList = getClassList('notification', mods);

  return (
    <div className={classList}>
      <div
        className="notification__content"
        role="presentation"
        onClick={closeAction}
      >
        <div className="notification__icon">
          <FontAwesomeIcon icon={iconNames[type]} />
        </div>
        <p className="notification__text">{children}</p>
      </div>
    </div>
  );
};

export default observer(Notification);
