import {
  faUpload,
  faCog,
  faSignOutAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../..';
import ActivateAccountPopup from '../ActivateAccountPopup/ActivateAccountPopup';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';

function ProfileInfo() {
  const { userStore, modalStore, notificationStore } = useContext(Context);
  const location = useLocation();

  const avatarStyles = {
    backgroundImage: `url(${userStore.user.avatar.url})`,
  };

  const optionsHandlers = {
    activateAccount() {
      modalStore.openModal(
        <ActivateAccountPopup />,
        {
          heading: 'Активация аккаунта',
        },
      );
    },
    logout() {
      modalStore.openModal(
        <ConfirmActionPopup
          text={['Вы уверены что хотите выйти из аккаунта?']}
          confirmText="Выйти"
          declineText="Отмена"
          confirmButtonStyles="fill error"
          confirmAction={() => new Promise((resolve) => {
            userStore
              .logout()
              .then(() => {
                notificationStore.show('Вы вышли из аккаунта', 2000, 'info');
                resolve();
              });
          })}
        />,
        {
          heading: 'Подтвердите действие',
          temporal: true,
        },
      );
    },
  };

  return (
    <div className="sb-block_container">
      <div className="user-info">
        <Link
          to={`/profile/${userStore.user.login}`}
          className="avatar"
          style={avatarStyles}
        />
        <div className="d-flex flex-column justify-content-center">
          <b className="username">
            <Link
              to={`/profile/${userStore.user.login}`}
            >
              {userStore.user.username}
            </Link>
          </b>
          <span className="profile-tag">{`@${userStore.user.login}`}</span>
        </div>
      </div>
      {!userStore.user.isActivated && (
        <div className="activation-notice">
          Активируйте аккаунт для получения доступа к возможностям приложения
        </div>
      )}
      <div className="options">
        {!userStore.user.isActivated && (
          <button
            type="button"
            className="option"
            onClick={() => optionsHandlers.activateAccount()}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Активация аккаунта</span>
          </button>
        )}
        <Link
          to="/profile/settings"
          className="option"
          state={{ backgroundLocation: location }}
        >
          <FontAwesomeIcon icon={faCog} />
          <span>Настройки</span>
        </Link>
        <button
          type="button"
          className="option logout"
          onClick={() => optionsHandlers.logout()}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
}

export default observer(ProfileInfo);
