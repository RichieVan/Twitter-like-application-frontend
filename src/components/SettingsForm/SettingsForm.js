import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  faUpload,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UpdateAvatarPopup from '../UpdateAvatarPopup/UpdateAvatarPopup';
import { Context } from '../../Context';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import useValidatedInput from '../../hooks/useValidatedInput';
import FormGroup from '../FormGroup/FormGroup';

function SettingsForm({ setModalHeading, defaultHeading, closeModal }) {
  const { userStore, appStore } = useContext(Context);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [goBack, setGoBack] = useState(null);
  const [formValidated, setFormValidated] = useState(true);
  const isFirstLoading = useRef(true);

  // value, onInput, validated, validatorsData
  const username = useValidatedInput(userStore.user.username, { len: [3, 26] });
  const about = useValidatedInput(userStore.user.about, {
    len: [0, 200],
    linebreaks: 9,
  });
  const [avatar, setAvatar] = useState(userStore.user.avatar);

  useEffect(() => {
    if (isFirstLoading.current) {
      document.title = 'Настройки пользователя';
      isFirstLoading.current = false;
    }

    if (username.validated && about.validated) setFormValidated(true);
    else setFormValidated(false);
  }, [username, about]);

  const getAvatarUrl = () => {
    if (avatar.data) return avatar.data;
    return avatar.url;
  };

  const handleGoBack = () => {
    const { f, v } = goBack;
    f(v);
    setGoBack(null);
    setModalHeading(defaultHeading);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updatedData = {
      username: username.value,
      about: about.value,
    };
    if (avatar.data) updatedData.avatar = avatar.data;

    appStore.setGlobalLoading(true);
    userStore.updateUser(updatedData)
      .then(() => {
        closeModal();
      })
      .finally(() => {
        appStore.setGlobalLoading(false);
      });

    return false;
  };

  const updateAvatarClickHandler = () => {
    setIsUpdatingAvatar(true);
    setModalHeading('Обновление аватара');
    setGoBack({
      f: setIsUpdatingAvatar,
      v: false,
    });
  };

  const fileUrlHandler = (fileDataUrl) => {
    setAvatar({
      data: fileDataUrl,
    });
    setModalHeading(defaultHeading);
  };

  const avatarStyles = {
    backgroundImage: `url(${getAvatarUrl()})`,
  };

  const render = () => {
    if (isUpdatingAvatar) {
      return (
        <UpdateAvatarPopup
          closeModal={handleGoBack}
          directly={false}
          fileUrlHandler={fileUrlHandler}
        />
      );
    }

    return (
      <form
        className="profile-settings__form"
        onSubmit={(e) => submitHandler(e)}
      >
        <FormGroup heading="Аватар">
          <div className="avatar-input" style={avatarStyles}>
            <button
              type="button"
              className="avatar-input__upload"
              onClick={() => updateAvatarClickHandler()}
            >
              <FontAwesomeIcon icon={faUpload} />
            </button>
          </div>
        </FormGroup>
        <FormGroup heading="Основная информация">
          <FormInput
            value={username.value}
            onInput={username.onInput}
            validated={username.validated}
            validatorsData={username.validatorsData}
          />
          <FormInput
            value={about.value}
            textarea
            textareaRows={4}
            onInput={about.onInput}
            validated={about.validated}
            validatorsData={about.validatorsData}
          />
        </FormGroup>
        <div className="buttons-container">
          <Button
            type="submit"
            mods={['fill', 'success', 'pull_right']}
            disabled={!formValidated}
          >
            Сохранить
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="profile-settings">
      {goBack !== null && (
        <div className="profile-settings__back-button">
          <Button
            clickHandler={() => handleGoBack()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>К настройкам</span>
          </Button>
        </div>
      )}
      {render()}
    </div>
  );
}

export default SettingsForm;
