import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faUpload,
  faArrowLeft,
  faLevelDownAlt,
  faPenAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UpdateAvatarPopup from '../../popup/UpdateAvatar';
import { Context } from '../../..';

// @TODO вынести форму с валидацией в отдельный набор компонентов

const validators = {
  about: {
    maxlen: {
      req: 200,
      validated: true,
      val(value) {
        return value;
      },
      validate(value) {
        const result = this.val(value).length <= this.req;

        if (result) this.validated = true;
        else this.validated = false;

        return {
          result,
          lettersCount: this.req - this.val(value).length,
        };
      },
      get title() {
        return `Максимум ${this.req} символов`;
      },
      get icon() {
        return faPenAlt;
      },
    },
    maxlinebreaks: {
      req: 9,
      validated: true,
      val(value) {
        return (value.match(/(\n)/g) !== null ? value.match(/(\n)/g).length : 0);
      },
      validate(value) {
        const result = this.val(value) <= this.req;

        if (result) this.validated = true;
        else this.validated = false;

        return {
          result,
          lettersCount: this.req - this.val(value),
        };
      },
      get title() {
        return `Не больше ${this.req} переносов строки`;
      },
      get icon() {
        return faLevelDownAlt;
      },
    },
    isValidated() {
      let result = true;
      Object.keys(this).filter((val) => val != 'isValidated').map((val) => {
        if (this[val].validated == false) result = false;
      });
      return result;
    },
  },
  username: {
    len: {
      reqmin: 3,
      reqmax: 28,
      validated: true,
      val(value) {
        return value;
      },
      validate(value) {
        const result = this.val(value).length >= this.reqmin && this.val(value).length <= this.reqmax;

        if (result) this.validated = true;
        else this.validated = false;

        return {
          result,
          lettersCount: this.reqmax - this.val(value).length,
        };
      },
      get title() {
        return `От ${this.reqmin} до ${this.reqmax} символов`;
      },
      get icon() {
        return faPenAlt;
      },
    },
    isValidated() {
      let result = true;
      Object.keys(this).filter((val) => val != 'isValidated').map((val) => {
        if (this[val].validated == false) result = false;
      });
      return result;
    },
  },
};

function ProfileSettings({ setModalHeading, defaultHeading, closeModal }) {
  const { userStore, appStore } = useContext(Context);
  const [userData, setUserData] = useState({ ...userStore.user });
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [goBack, setGoBack] = useState(null);
  const [formValidated, setFormValidated] = useState(true);
  // const navigate = useNavigate();
  const isFirstLoading = useRef(true);
  const modifyingFields = useRef(['username', 'about', 'avatar']);

  useEffect(() => {
    if (isFirstLoading.current) {
      document.title = 'Настройки пользователя';
      isFirstLoading.current = false;
    } else {
      let validated = true;
      Object.keys(validators).forEach((val) => {
        if (!validators[val].isValidated()) validated = false;
      });
      setFormValidated(validated);
    }
  }, [userData]);

  const handleGoBack = () => {
    const { f, v } = goBack;
    f(v);
    setGoBack(null);
    setModalHeading(defaultHeading);
  };

  const avatarStyles = {
    backgroundImage: `url(${userData.avatar.url})`,
  };

  const render = () => {
    if (isUpdatingAvatar) {
      return (
        <UpdateAvatarPopup
          closeModal={handleGoBack}
          directly={false}
          fileUrlHandler={(fileDataUrl) => {
            setUserData({
              ...Object.assign(
                userData,
                {
                  avatar: { name: fileDataUrl, url: fileDataUrl },
                },
              ),
            });
            setModalHeading(defaultHeading);
          }}
        />
      );
    }

    return (
      <div className="pf-settings_wrapper">
        <form className="pf-settings default-form">
          <div className="settings-group">
            <div className="settings-group_name">
              <span>Аватар</span>
              <div className="settings-group_name_gradient" />
            </div>
            <div className="setting">
              <div className="avatar" style={avatarStyles}>
                <button
                  type="button"
                  className="upload-new"
                  onClick={() => {
                    setIsUpdatingAvatar(true);
                    setModalHeading('Обновление аватара');
                    setGoBack({
                      f: setIsUpdatingAvatar,
                      v: false,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              </div>
            </div>
          </div>
          <div className="settings-group">
            <div className="settings-group_name">
              <span>Основная информация</span>
              <div className="settings-group_name_gradient" />
            </div>
            <div className="setting input-container">
              <div className="setting_input">
                <div className="validation-requirements">
                  {Object.keys(validators.username).map((val) => {
                    const validator = validators.username[val];

                    if (typeof validator === 'function') return;
                    const result = validator.validate(userData.username).lettersCount;

                    return (
                      <div
                        key={`username_${val}`}
                        className="val-req"
                        data-validator={val}
                        data-validated={validator.validated}
                        title={validator.title}
                      >
                        {result}
                        {validator.icon && <FontAwesomeIcon icon={validator.icon} />}
                      </div>
                    );
                  })}
                </div>
                <input
                  type="text"
                  name="username"
                  id="stng_username"
                  value={userData.username}
                  data-empty={!userData.username}
                  data-validated={validators.username.isValidated()}
                  onChange={(e) => {
                    setUserData({ ...Object.assign(userData, { username: e.target.value }) });
                  }}
                />
                <label htmlFor="stng_username">Имя пользователя</label>
              </div>
            </div>
            <div className="setting input-container">
              <div className="setting_input">
                <div className="validation-requirements">
                  {Object.keys(validators.about).map((val) => {
                    const validator = validators.about[val];

                    if (typeof validator === 'function') return;
                    const result = validator.validate(userData.about).lettersCount;

                    return (
                      <div
                        key={`about_${val}`}
                        className="val-req"
                        data-validator={val}
                        data-validated={validator.validated}
                        title={validator.title}
                      >
                        {result}
                        <FontAwesomeIcon icon={validator.icon} />
                      </div>
                    );
                  })}
                </div>
                <textarea
                  name="about"
                  id="stng_about"
                  rows="4"
                  value={userData.about}
                  data-empty={!userData.about}
                  data-validated={validators.about.isValidated()}
                  onChange={(e) => {
                    setUserData({ ...Object.assign(userData, { about: e.target.value }) });
                  }}
                >
                  {userData.about}
                </textarea>
                <label htmlFor="stng_about">О себе</label>
              </div>
            </div>
          </div>
        </form>
        <div className="buttons-container">
          <button
            type="button"
            className="btn fill success to-right"
            disabled={!formValidated}
            onClick={() => {
              const sendingData = {};
              modifyingFields.current.forEach((element) => {
                if (element === 'avatar') {
                  sendingData[element] = userData[element].name;
                  return;
                }
                sendingData[element] = userData[element];
              });

              appStore.setGlobalLoading(true);
              userStore.updateUser(sendingData)
                .then(() => {
                  appStore.setGlobalLoading(false);
                  closeModal();
                })
                .catch(() => {
                  appStore.setGlobalLoading(false);
                });
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pf-settings_container">
      {goBack && (
        <button
          type="button"
          className="btn modal-goBack"
          onClick={() => {
            handleGoBack();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>К настройкам</span>
        </button>
      )}
      {render()}
    </div>
  );
}

export default ProfileSettings;
