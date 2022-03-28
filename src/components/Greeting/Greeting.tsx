import React, { FC } from 'react';
import getRandomInt from '../../lib/getRandomInt/getRandomInt';
import { STATIC_URL } from '../../http/index';
import GreetingAuthForm from '../GreetingAuthForm/GreetingAuthForm';
import GreetingRegistrationForm from '../GreetingRegistrationForm/GreetingRegistrationForm';

const Greeting: FC = () => {
  const bgImage = `${getRandomInt(3) + 1}.png`;
  const styles = {
    backgroundImage: `url(${STATIC_URL}/uploads/authbg/${bgImage})`,
  };

  return (
    <div className="greeting">
      <div className="greeting__wrapper">
        <div className="greeting__image" style={styles}>
          <h1 className="greeting__heading">
            Добро
            <br />
            пожаловать
          </h1>
        </div>
        <div className="greeting__forms">
          <div className="greeting__form-wrapper">
            <div className="greeting__form-heading">
              <h2>Авторизоваться</h2>
              <span>Используя уже существующий аккаунт</span>
            </div>
            <div className="greeting__form-container">
              <GreetingAuthForm />
            </div>
          </div>
          <div className="greeting__form-wrapper">
            <div className="greeting__form-heading">
              <h2>Зарегистрироваться</h2>
              <span>Создайте аккаунт чтобы полноценно пользоваться приложением</span>
            </div>
            <div className="greeting__form-container">
              <GreetingRegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
