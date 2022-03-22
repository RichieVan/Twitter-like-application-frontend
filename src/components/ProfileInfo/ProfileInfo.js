import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';

import { Context } from '../../Context';
import FormatPostText from '../../lib/formatPostText';
import Button from '../Button/Button';

const ProfileInfo = ({ userData }) => {
  const { userStore, notificationStore } = useContext(Context);
  const [subscribed, setSubscribed] = useState(userData.currentUserSubscribed);

  const subscribeHandler = (e) => {
    e.target.disabled = true;
    userStore.subscribeToUser(userData.id)
      .then(() => {
        setSubscribed(true);
        e.target.disabled = false;
        const notificationMessage = `Вы подписались на пользователя ${userData.username}`;
        notificationStore.show(notificationMessage, 2000, 'success');
      });
  };

  const unsubscribeHandler = (e) => {
    e.target.disabled = true;
    userStore.unsubscribeFromUser(userData.id)
      .then(() => {
        setSubscribed(false);
        e.target.disabled = false;
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
  const aboutText = userData.about ? FormatPostText(userData.about) : noInfoMessage;
  const showSubscribeButton = userStore?.user.id && (userData.id !== userStore.user.id);

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
