import {
  faCog,
  faSignOutAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Context } from '../../Context';
import ActivateAccountPopup from '../ActivateAccountPopup/ActivateAccountPopup';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import UserInfoPanelProps from './types';

const UserInfoPanel: FC<UserInfoPanelProps> = ({ userData }) => {
  const { userStore, modalStore, notificationStore } = useContext(Context);
  const location = useLocation();

  // Пофиксить после изменения AuthRequired
  const avatarStyles = {
    backgroundImage: `url(${userData.avatar.url})`,
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
        <ConfirmPopup
          text={['Вы уверены что хотите выйти из аккаунта?']}
          confirmText="Выйти"
          declineText="Отмена"
          confirmButtonMods={['fill', 'error']}
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
    <div className="user-info">
      <div className="user-info__wrapper">
        <Link
          to={`/profile/${userData.login}`}
          className="user-info__avatar"
          style={avatarStyles}
        />
        <div className="user-info__username-wrapper">
          <Link
            className="user-info__username"
            to={`/profile/${userData.login}`}
          >
            <b>
              {userData.username}
            </b>
          </Link>
          <span className="user-info__tag">{`@${userData.login}`}</span>
        </div>
      </div>
      {!userData.isActivated && (
        <div className="user-info__activation-notice">
          Активируйте аккаунт для получения доступа к возможностям приложения
        </div>
      )}
      <div className="user-info__options">
        {!userData.isActivated && (
          <button
            type="button"
            className="user-info__option"
            onClick={() => optionsHandlers.activateAccount()}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Активация аккаунта</span>
          </button>
        )}
        <Link
          to="/profile/settings"
          className="user-info__option"
          state={{ backgroundLocation: location }}
        >
          <FontAwesomeIcon icon={faCog} />
          <span>Настройки</span>
        </Link>
        <button
          type="button"
          className="user-info__option user-info__option_logout"
          onClick={() => optionsHandlers.logout()}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
};

export default observer(UserInfoPanel);
