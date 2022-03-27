import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  FC,
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
import { UserAvatarData } from '../../types/types';
import { GoBackFunction, SettingsFormProps } from './types';

const SettingsForm: FC<SettingsFormProps> = ({
  userData,
  defaultHeading = '',
  setModalHeading,
  closeModal,
}) => {
  const { userStore, appStore } = useContext(Context);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [goBack, setGoBack] = useState<GoBackFunction>(null);
  const [formValidated, setFormValidated] = useState(true);
  const isFirstLoading = useRef(true);

  const username = useValidatedInput(userData.username, {
    len: { min: 3, max: 26 },
  });
  const about = useValidatedInput(userData.about, {
    len: { min: 0, max: 200 },
    linebreaks: 9,
  });
  const [avatar, setAvatar] = useState<UserAvatarData>(userData.avatar);

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
    if (goBack) goBack();
    setGoBack(null);
    if (setModalHeading) setModalHeading(defaultHeading);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      username: username.value,
      about: about.value,
      avatar,
    };

    appStore.setGlobalLoading(true);
    userStore
      .updateUser(updatedData)
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
    if (setModalHeading) setModalHeading('Обновление аватара');
    setGoBack(() => () => setIsUpdatingAvatar(false));
  };

  const fileUrlHandler = (fileDataUrl: string) => {
    setAvatar({ ...avatar, data: fileDataUrl });
    if (setModalHeading) setModalHeading(defaultHeading);
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
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
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
            label="Имя пользователя"
          />
          <FormInput
            value={about.value}
            textarea
            textareaRows={4}
            onInput={about.onInput}
            validated={about.validated}
            validatorsData={about.validatorsData}
            label="Обо мне"
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
            onClick={handleGoBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>К настройкам</span>
          </Button>
        </div>
      )}
      {render()}
    </div>
  );
};

export default SettingsForm;
