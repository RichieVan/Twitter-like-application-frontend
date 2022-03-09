import React, { useContext, useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import LoadingMask from './LoadingMask';
import { Context } from '../index';
import getRandomInt from '../lib/getRandomInt';
import { STATIC_URL } from '../http/index';

function LoginForm() {
  const { userStore } = useContext(Context);
  const [loginOrEmail, setLoginOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <form
      className="default-form"
      method="post"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        setisLoading(true);
        userStore.login(loginOrEmail, password)
          .then(() => {
            navigate('/feed');
          })
          .catch(() => {
            setisLoading(false);
          });
      }}
    >
      {isLoading && (
        <LoadingMask cHeight={50} cWidth={50} bg="var(--bg1)" opacity={0.8} />
      )}
      <div className="input-container thin">
        <input
          type="text"
          value={loginOrEmail}
          id="auth_loginOrEmail"
          name="loginOrEmail"
          placeholder="Логин или E-mail"
          required
          onChange={(e) => setLoginOrEmail(e.target.value)}
        />
      </div>
      <div className="input-container thin">
        <input
          type="password"
          value={password}
          id="auth_password"
          name="password"
          placeholder="Пароль"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn info to-right"
      >
        <FontAwesomeIcon icon={faSignInAlt} />
      </button>
    </form>
  );
}

function RegistrationForm() {
  const { userStore } = useContext(Context);

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <form
      className="default-form"
      method="post"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        setisLoading(true);
        userStore.registration({
          login, email, password, passwordRepeat,
        })
          .then(() => {
            navigate('/feed');
          })
          .catch(() => {
            setisLoading(false);
          });
      }}
    >
      {isLoading && (
        <LoadingMask cHeight={50} cWidth={50} bg="var(--bg1)" opacity={0.8} />
      )}
      <div className="input-container thin">
        <input
          type="text"
          value={login}
          id="register_login"
          name="login"
          placeholder="Логин"
          required
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="input-container thin">
        <input
          type="email"
          value={email}
          id="register_email"
          name="email"
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container thin">
        <input
          type="password"
          value={password}
          id="register_password"
          name="password"
          placeholder="Пароль"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container thin">
        <input
          type="password"
          value={passwordRepeat}
          id="register_passwordRepeat"
          name="passwordRepeat"
          placeholder="Повторите пароль"
          required
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn info to-right"
      >
        <FontAwesomeIcon icon={faSignInAlt} />
      </button>
    </form>
  );
}

function Greeting() {
  const bgImage = `${getRandomInt(3) + 1}.png`;
  const styles = {
    backgroundImage: `url(${STATIC_URL}/uploads/authbg/${bgImage})`,
  };

  return (
    <div className="greeting-wrapper">
      <div className="heading" style={styles}>
        <h1>
          Добро
          <br />
          пожаловать
        </h1>
      </div>
      <div className="auth-options">
        <div className="auth-option login">
          <div className="auth-option_heading">
            <h2>Авторизоваться</h2>
            <span>Используя уже существующий аккаунт</span>
          </div>
          <LoginForm />
        </div>
        <div className="auth-option register">
          <div className="auth-option_heading">
            <h2>Зарегистрироваться</h2>
            <span>Создайте аккаунт чтобы полноценно пользоваться приложением</span>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default Greeting;
