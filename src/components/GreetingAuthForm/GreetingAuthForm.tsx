import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import useInput from '../../hooks/useInput';
import Button from '../Button/Button';
import FormGroup from '../FormGroup/FormGroup';
import FormInput from '../FormInput/FormInput';
import LoadingMask from '../LoadingMask/LoadingMask';

const GreetingAuthForm: FC = () => {
  const { userStore, notificationStore } = useContext(Context);
  const [isLoading, setisLoading] = useState(false);
  const loginOrEmail = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    userStore
      .login({
        loginOrEmail: loginOrEmail.value,
        password: password.value,
      })
      .then(() => {
        notificationStore.show('Вы успешно авторизовались', 2000, 'success');
        navigate('/feed');
      })
      .catch((err: Error) => {
        notificationStore.show(err.message, 2000, 'error');
        setisLoading(false);
      });
  };

  return (
    <form
      className="greeting-auth"
      method="post"
      autoComplete="off"
      onSubmit={(e) => submitHandler(e)}
    >
      {isLoading && (
        <LoadingMask cHeight={50} cWidth={50} bg="var(--bg1)" opacity={0.8} />
      )}
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
