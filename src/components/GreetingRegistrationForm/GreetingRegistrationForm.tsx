import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import ApiError from '../../exceptions/ApiError';
import useInput from '../../hooks/useInput';
import ActivateAccountPopup from '../ActivateAccountPopup/ActivateAccountPopup';
import Button from '../Button/Button';
import FormGroup from '../FormGroup/FormGroup';
import FormInput from '../FormInput/FormInput';
import LoadingMask from '../LoadingMask/LoadingMask';

const GreetingAuthForm: FC = () => {
  const { userStore, modalStore, notificationStore } = useContext(Context);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const login = useInput();
  const email = useInput();
  const password = useInput();
  const passwordRepeat = useInput();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    userStore
      .registration({
        login: login.value,
        email: email.value,
        password: password.value,
        passwordRepeat: passwordRepeat.value,
      })
      .then(() => {
        notificationStore.show('Вы были успешно авторизованы', 4000, 'success');
        modalStore.openModal(<ActivateAccountPopup />, {
          heading: 'Активация аккаунта',
        });
        navigate('/feed');
      })
      .catch((err: ApiError) => {
        let timeout = 0;
        err.errors.forEach((value) => {
          setTimeout(() => {
            notificationStore.show(value, 4000, 'error');
          }, timeout);
          timeout += 200;
        });
        setisLoading(false);
      });
  };

  return (
    <form
      className="greeting-registration"
      method="post"
      autoComplete="off"
      onSubmit={(e) => submitHandler(e)}
    >
      {isLoading && (
        <LoadingMask
          size={50}
          bg="main"
          opacity={0.8}
        />
      )}
      <FormGroup mods={['thin']}>
        <FormInput
          name="login"
          value={login.value}
          onInput={login.onInput}
          placeholder="Логин"
          required
          mods={['thin']}
        />
        <FormInput
          name="email"
          type="email"
          value={email.value}
          onInput={email.onInput}
          placeholder="E-mail"
          required
          mods={['thin']}
        />
        <FormInput
          type="password"
          name="password"
          value={password.value}
          onInput={password.onInput}
          placeholder="Пароль"
          required
          mods={['thin']}
        />
        <FormInput
          type="password"
          name="password"
          value={passwordRepeat.value}
          onInput={passwordRepeat.onInput}
          placeholder="Повторите пароль"
          required
          mods={['thin']}
        />
      </FormGroup>
      <Button
        type="submit"
        mods={['info', 'for_icon', 'pull_right']}
      >
        <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    </form>
  );
};

export default observer(GreetingAuthForm);
