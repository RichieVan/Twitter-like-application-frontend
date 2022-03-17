import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import useInput from '../../hooks/useInput';
import Button from '../Button/Button';
import FormGroup from '../FormGroup/FormGroup';
import FormInput from '../FormInput/FormInput';
import LoadingMask from '../LoadingMask/LoadingMask';

function GreetingAuthForm() {
  const { userStore } = useContext(Context);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const login = useInput();
  const email = useInput();
  const password = useInput();
  const passwordRepeat = useInput();

  const submitHandler = (e) => {
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
        navigate('/feed');
      })
      .catch(() => {
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
        <LoadingMask cHeight={50} cWidth={50} bg="var(--bg1)" opacity={0.8} />
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
}

export default observer(GreetingAuthForm);
