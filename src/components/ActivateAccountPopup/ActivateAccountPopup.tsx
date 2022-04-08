import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { Context } from '../../Context';
import LoadingCircle from '../../assets/img/icons/loading.svg';
import AddLeadZero from '../../lib/addLeadZero/addLeadZero';
import LoadingMask from '../LoadingMask/LoadingMask';

const ActivateAccountPopup: FC = () => {
  const { userStore } = useContext(Context);
  const [isSending, setIsSending] = useState(false);
  const [sendingCooldown, setSendingCooldown] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      userStore
        .getActivationMailCooldown()
        .then((dateAfterCooldown) => {
          if (dateAfterCooldown) {
            const cooldownTimestamp = new Date(dateAfterCooldown).getTime() - Date.now();
            setSendingCooldown(Math.trunc(cooldownTimestamp / 1000) + 1);
            setIsSending(false);
          } else {
            setSendingCooldown(0);
          }
          setLoading(false);
        });
    }
  });

  const message = `На ваш почтовый адрес ${userStore.user!.email} отправлено письмо с ссылкой для активации аккаунта. Перейдите по ней для завершения регистрации.`;

  let sendingTimeout: NodeJS.Timeout;
  const resendOption = () => {
    if (sendingCooldown > 0) {
      sendingTimeout = setTimeout(() => {
        setSendingCooldown(sendingCooldown - 1);
      }, 1000);
      return (
        <div className="activate-account-popup__send">
          <span>Письмо отправлено!</span>
          <b className="activate-account-popup__cooldown">
            Повторная отправка будет доступна через
            <span>
              {`${Math.trunc(sendingCooldown / 60)}:${AddLeadZero(sendingCooldown % 60)}`}
            </span>
          </b>
        </div>
      );
    }

    if (typeof sendingTimeout !== 'undefined') {
      clearTimeout(sendingTimeout);
    }

    if (isSending) {
      return (
        <div className="activate-account-popup__send">
          <span>Не приходит письмо?</span>
          <b className="activate-account-popup__sending">
            <span>Отправка сообщения...</span>
            <LoadingCircle width={20} height={20} />
          </b>
        </div>
      );
    }

    return (
      <div className="activate-account-popup__send">
        <span>Не приходит письмо?</span>
        <button
          type="button"
          onClick={() => {
            setIsSending(true);
            userStore
              .sendNewActivationMail()
              .then((dateAfterCooldown) => {
                const timestampAfterCooldown = new Date(dateAfterCooldown).getTime();
                const cooldownTimestamp = timestampAfterCooldown - Date.now();
                setSendingCooldown(Math.trunc(cooldownTimestamp / 1000) + 1);
                setIsSending(false);
              });
          }}
        >
          Отправить повторно
        </button>
      </div>
    );
  };

  return (
    <div className="activate-account-popup">
      <div className="activate-account-popup__message">{message}</div>
      {resendOption()}
      {loading ? (
        <LoadingMask
          size={50}
          bg="main"
          opacity={1}
        />
      ) : ''}
    </div>
  );
};

export default ActivateAccountPopup;
