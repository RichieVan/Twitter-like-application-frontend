import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index.js';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingMask from './LoadingMask.js';
import { useNavigate } from 'react-router-dom';
import getRandomInt from '../lib/getRandomInt'

const LoginForm = () => {
    const {userStore} = useContext(Context);
    const [loginOrEmail, setLoginOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <form 
            className='default-form' 
            method='post' 
            autoComplete='off'
            onSubmit={(e) => {
                e.preventDefault()
                setisLoading(true)
                userStore.login(loginOrEmail, password)
                    .then(() => {
                        navigate('/feed');
                    })
                    .catch(() => {
                        setisLoading(false)
                    })
            }}
        >
            {isLoading && (
                <LoadingMask cHeight={50} cWidth={50} bg='var(--bg1)' opacity={0.8}/>
            )}
            <div className="input-container thin">
                <input 
                    type='text'
                    value={loginOrEmail}
                    id='auth_loginOrEmail'
                    name='loginOrEmail'
                    placeholder='Логин или E-mail'
                    required
                    onChange={e => setLoginOrEmail(e.target.value)}
                />
            </div>
            <div className="input-container thin">
                <input 
                    type='password' 
                    value={password}
                    id='auth_password'
                    name='password' 
                    placeholder='Пароль'
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className='btn info to-right'>
                <FontAwesomeIcon icon={faSignInAlt} />
            </button>
        </form>
    );
}

const RegistrationForm = () => {
    const {userStore} = useContext(Context);

    const [login, setLogin] = useState('1');
    const [email, setEmail] = useState('1@1.1');
    const [password, setPassword] = useState('123');
    const [passwordRepeat, setPasswordRepeat] = useState('123');
    const [isLoading, setisLoading] = useState(false);

    const navigate = useNavigate();

    //return (<button onClick={() => {userStore.logout()}}>Логаут</button>);
    return (
        <form 
            className='default-form' 
            method='post' 
            autoComplete='off'
            onSubmit={(e) => {
                e.preventDefault()
                setisLoading(true)
                userStore.registration({login, email, password, passwordRepeat})
                    .then(() => {
                        navigate('/feed');
                    })
                    .catch(() => {
                        setisLoading(false)
                    })
            }}
        >
            {isLoading && (
                <LoadingMask cHeight={50} cWidth={50} bg='var(--bg1)' opacity={0.8}/>
            )}
            <div className="input-container thin">
                <input 
                    type='text'
                    value={login}
                    id='register_login'
                    name='login'
                    placeholder='Логин'
                    required
                    onChange={e => setLogin(e.target.value)}
                />
            </div>
            <div className="input-container thin">
                <input 
                    type='email' 
                    value={email}
                    id='register_email'
                    name='email' 
                    placeholder='E-mail'
                    required
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="input-container thin">
                <input 
                    type='password' 
                    value={password}
                    id='register_password'
                    name='password' 
                    placeholder='Пароль'
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="input-container thin">
                <input 
                    type='password' 
                    value={passwordRepeat}
                    id='register_passwordRepeat'
                    name='passwordRepeat' 
                    placeholder='Повторите пароль'
                    required
                    onChange={e => setPasswordRepeat(e.target.value)}
                />
            </div>
            <button className='btn info to-right'>
                <FontAwesomeIcon icon={faSignInAlt} />
            </button>
        </form>
    );
}

const Greeting = () => {
    const {appStore} = useContext(Context);

    const bgImage = getRandomInt(3) + 1 + '.png';

    const styles = {
        backgroundImage : `url(${appStore.apiUrl}/uploads/authbg/${bgImage})`
    }

    return (
        <div className="greeting-wrapper">
            <div className="heading" style={styles}>
                <h1>Добро<br/>пожаловать</h1>
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
    )
}

export default Greeting;