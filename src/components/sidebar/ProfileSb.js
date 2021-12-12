import { faUpload, faCog, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from "../.."
import ActivateAccountPopup from '../popup/ActivateAccount';
import ConfirmAction from '../popup/ConfirmAction';
import UpdateAvatarPopup from '../popup/UpdateAvatar';

const ProfileInfo = () => {
    const {userStore, modalStore, notificationStore} = useContext(Context);
    const location = useLocation();

    const avatarStyles = {
      backgroundImage : `url(${userStore.user.avatar.url})`
    }

    return (
        <div className='sb-block_container'>
          <div className='user-info'>
            <div className="avatar" style={avatarStyles}>
              <a className='upload-new' onClick={() => {
                  modalStore.openModal(<UpdateAvatarPopup directly={true}/>, {
                    heading : 'Обновление аватара пользователя'
                  });
                }}>
                <FontAwesomeIcon icon={faUpload} />
              </a>
            </div>
            <div className='d-flex flex-column justify-content-center'>
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
                className="option" 
                onClick={() => {
                  modalStore.openModal(<ActivateAccountPopup />, {
                    heading : 'Активация аккаунта'
                  });
                }}
              >
                <FontAwesomeIcon icon={faEnvelope}/>
                <span>Активация аккаунта</span>
              </button>
            )}
            <Link 
              to={`/profile/settings`}
              className="option"
              state={{backgroundLocation: location}}
            >
              <FontAwesomeIcon icon={faCog}/>
              <span>Настройки</span>
            </Link>
            <button
              className="option logout" 
              onClick={() => {
                modalStore.openModal(
                  <ConfirmAction 
                      text={['Вы уверены что хотите выйти из аккаунта?']}
                      confirmText='Выйти'
                      declineText='Отмена'
                      confirmButtonStyles='fill error'
                      confirmAction={() => {
                        return new Promise((resolve) => {
                          userStore.logout().then(() => {
                            notificationStore.show('Вы вышли из аккаунта', 2000, 'info')
                            resolve()
                          });
                        })
                      }}
                  />, 
                  {
                      heading : 'Подтвердите действие',
                      temporal : true
                  }
              );
                ;
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt}/>
              <span>Выйти из аккаунта</span>
            </button>
          </div>
        </div>
    )
}

export default observer(ProfileInfo);