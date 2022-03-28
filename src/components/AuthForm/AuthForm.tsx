import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import { Context } from '../../Context';
import LoadingMask from '../LoadingMask/LoadingMask';
import FormGroup from '../FormGroup/FormGroup';
import FormInput from '../FormInput/FormInput';
import useInput from '../../hooks/useInput';
import Button from '../Button/Button';

const AuthForm: FC = () => {
  const { userStore } = useContext(Context);
  const [isLoading, setisLoading] = useState(false);
  const loginOrEmail = useInput();
  const password = useInput();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    userStore
      .login({
        loginOrEmail: loginOrEmail.value,
        password: password.value,
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  return (
    <form
      className="auth-form"
      method="post"
      autoComplete="off"
      onSubmit={submitHandler}
    >
      {isLoading && (
        <LoadingMask cHeight={50} cWidth={50} bg="var(--bg1)" opacity={0.8} />
      )}
      <h2 className="auth-form__heading">Авторизация</h2>
      <FormGroup mods={['thin']}>
        <FormInput
          name="loginOrEmail"
          value={loginOrEmail.value}
          onInput={loginOrEmail.onInput}
          placeholder="Логин или E-mail"
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
      </FormGroup>
      <div className="auth-form__bottom-panel">
        <Link
          to="/"
          className="link-blue"
        >
          Регистрация
        </Link>
        <Button
          type="submit"
          mods={['info', 'for_icon']}
        >
          <FontAwesomeIcon icon={faSignInAlt} />
        </Button>
      </div>
    </form>
  );
};

export default observer(AuthForm);
