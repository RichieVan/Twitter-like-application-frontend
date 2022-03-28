import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';

import { Context } from '../../Context';
import formatPostText from '../../lib/formatPostText/formatPostText';
import Button from '../Button/Button';
import { ProfileInfoProps } from './types';

const ProfileInfo: FC<ProfileInfoProps> = ({
  userData,
}) => {
  const { userStore, notificationStore } = useContext(Context);
  const [subscribed, setSubscribed] = useState(userData.currentUserSubscribed);

  const subscribeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.disabled = true;
    userStore.subscribeToUser(userData.id)
      .then(() => {
        setSubscribed(true);
        target.disabled = false;
        const notificationMessage = `Вы подписались на пользователя ${userData.username}`;
        notificationStore.show(notificationMessage, 2000, 'success');
      });
  };

  const unsubscribeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.disabled = true;
    userStore.unsubscribeFromUser(userData.id)
      .then(() => {
        setSubscribed(false);
        target.disabled = false;
        const notificationMessage = `Вы отписались от пользователя ${userData.username}`;
        notificationStore.show(notificationMessage, 2000, 'info');
      });
  };

  const renderSubscribeButton = () => {
    if (subscribed) {
      return (
        <Button
          mods={['error']}
          onClick={unsubscribeHandler}
        >
          Отписаться
        </Button>
      );
    }

    return (
      <Button
        mods={['info']}
        onClick={subscribeHandler}
      >
        Подписаться
      </Button>
    );
  };

  const noInfoMessage = 'Пользователь не оставил информации о себе';
  const aboutText = userData.about ? formatPostText(userData.about) : noInfoMessage;
  const showSubscribeButton = userStore.user?.id && (userData.id !== userStore.user.id);

  return (
    <div className="profile-info">
      <div className="profile-info__wrapper">
        <b className="profile-info__heading">Обо мне:</b>
        <p className="profile-info__text">{aboutText}</p>
      </div>
      <div className="profile-info__buttons">
        {showSubscribeButton && renderSubscribeButton()}
      </div>
    </div>
  );
};

export default observer(ProfileInfo);
