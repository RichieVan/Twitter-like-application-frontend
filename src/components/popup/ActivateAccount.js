import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.css';
import { Context } from '../../index.js';
import LoadingCircle from '../../assets/img/icons/loading.svg' ;
import AddLeadZero from '../../lib/addLeadZero';
import LoadingMask from '../LoadingMask';

let sendingTimeout;

const ActivateAccountPopup = () => {
    const {userStore} = useContext(Context);
    const [isSending, setIsSending] = useState(false);
    const [sendingCooldown, setSendingCooldown] = useState(null);
    const isFirstLoading = useRef(true);

    if (isFirstLoading.current) {
        userStore.getActivationMailCooldown().then((dateAfterCooldown) => {
            isFirstLoading.current = false;

            if (dateAfterCooldown) {
                const cooldownTimestamp = new Date(new Date(dateAfterCooldown).getTime() - Date.now());
                setSendingCooldown(Math.trunc(cooldownTimestamp / 1000) + 1);
                setIsSending(false);
            } else {
                setSendingCooldown(0);
            }
        });
    }

    const message = `На ваш почтовый адрес ${userStore.user.email} отправлено письмо с ссылкой для активации аккаунта. Перейдите по ней для завершения регистрации.`

    const resendOption = () => {
        if (sendingCooldown > 0) {
            sendingTimeout = setTimeout(() => {
                setSendingCooldown(sendingCooldown - 1);
            }, 1000);
            return (
                <div className='send-new'>
                    <span>Письмо отправлено!</span>
                    <b className="sending-cooldown">
                        Повторная отправка будет доступна через 
                        <span>{Math.trunc(sendingCooldown / 60)}:{AddLeadZero(sendingCooldown % 60)}</span>
                    </b>
                </div>
            )
        }

        if (typeof sendingTimeout !== 'undefined') {
            clearTimeout(sendingTimeout);
        }

        if (isSending) {
            return (
                <div className='send-new'>
                    <span>Не приходит письмо?</span>
                    <b className="sending-message">
                        <span>Отправка сообщения...</span>
                        <LoadingCircle height={20} height={20}/>
                    </b>
                </div>
            )
        }

        return (
            <div className='send-new'>
                <span>Не приходит письмо?</span>
                <a href="#" onClick={() => {
                    setIsSending(true);
                    userStore.sendNewActivationMail().then((dateAfterCooldown) => {
                        const cooldownTimestamp = new Date(new Date(dateAfterCooldown).getTime() - Date.now());
                        setSendingCooldown(Math.trunc(cooldownTimestamp / 1000) + 1);
                        setIsSending(false);
                    });
                }}>Отправить повторно</a>
            </div>
        )
    }

    return (
        <div className='actacc-container'>
            <div className='message'>{message}</div>
            {resendOption()}
            {isFirstLoading.current ? (
                <LoadingMask cHeight={50} cWidth={50} bg='#0f0f0f' opacity={1}/>
            ) : ''}
        </div>
    );
}

export default ActivateAccountPopup;