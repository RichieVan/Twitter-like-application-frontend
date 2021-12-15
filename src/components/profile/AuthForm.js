import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../../index.js';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingMask from '../LoadingMask.js';

const LoginForm = () => {
    const {notificationStore} = useContext(Context);
    const [loginOrEmail, setLoginOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const {userStore} = useContext(Context);

    return (
        <form 
            className='auth-form default-form' 
            method='post' 
            autoComplete='off'
            onSubmit={(e) => {
                e.preventDefault()
                setisLoading(true)
                userStore.login(loginOrEmail, password)
                    .catch((err) => {
                        setisLoading(false)
                    })
            }}
        >
            {isLoading && (
                <LoadingMask cHeight={50} cWidth={50} bg='var(--bg1)' opacity={0.8}/>
            )}
            <div className="auth-heading">
                <b>Авторизация</b>
                <button className='btn info to-right'>
                    <FontAwesomeIcon icon={faSignInAlt} />
                </button>
            </div>
            <div className="input-container thin">
                <input 
                    type='text'
                    value={loginOrEmail}
                    id='authSb_loginOrEmail'
                    name='loginOrEmail'
                    placeholder='Логин или E-mail'
                    required
                    onInput={e => setLoginOrEmail(e.target.value)}
                />
            </div>
            <div className="input-container thin">
                <input 
                    type='password' 
                    value={password}
                    id='authSb_password'
                    name='password' 
                    placeholder='Пароль'
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <a href="/" className="link-blue">Регистрация</a>
        </form>
    );
}

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userStore} = useContext(Context);

    //return (<button onClick={() => {userStore.logout()}}>Логаут</button>);
    return (
        <form className='auth-form' autoComplete='off' method='post' onSubmit={(e) => {
            e.preventDefault();
            userStore.registration(login, email, password)
        }}>
            <h2>Регистрация</h2>
            <input 
                type='text'
                value={login}
                name='login'
                placeholder='Логин'
                onChange={e => setLogin(e.target.value)}
            />
            <input 
                type='email'
                value={email}
                name='email'
                placeholder='E-mail'
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type='password' 
                value={password}
                name='password' 
                placeholder='Пароль'
                onChange={e => setPassword(e.target.value)}
            />
            <button>Регистрация</button>
        </form>
    );
}

function AuthForm () {
    return (
        <div className='sb-block_container'>
            <LoginForm/>
        </div>
    );
}

export default observer(AuthForm);