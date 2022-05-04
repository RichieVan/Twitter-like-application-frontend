import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import LoadingMask from '../LoadingMask/LoadingMask';
import ActivateAccountPopup from '../ActivateAccountPopup/ActivateAccountPopup';
import { Context } from '../../Context';
import Button from '../Button/Button';
import { PostFormProps } from './types';

const PostForm: FC<PostFormProps> = ({
  userData: { id: userId, login, isActivated, avatar },
  submitAction,
  placeholder = '',
}) => {
  const { modalStore } = useContext(Context);
  const [textContent, setTextContent] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDisabled(true);
    setIsLoading(true);

    submitAction({
      textContent,
      userId,
    })
      .then(() => {
        setTextContent('');
        setDisabled(false);
        setIsLoading(false);
      })
    
    return false;
  }

  const type = 'post';
  const fieldMinHeight = 40;

  const inputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = (e.target as HTMLTextAreaElement);
    const { value } = target;
    const inputHeight = value.match(/(\r\n|\r|\n)/g);
    target.style.height = `${fieldMinHeight + (inputHeight?.length || 0) * 20}px`;

    setTextContent(value);
    setDisabled(value.trim().length === 0)
  };

  return (
    <form
      action="post"
      className={`post-form post-form_type_${type}`}
      onSubmit={(e) => formSubmitHandler(e)}
    >
      <div className="post-form__avatar">
        <Link
          to={`/profile/${login}`}
          className="post-form__avatar-link"
          style={{ backgroundImage: `url(${avatar.url})` }}
        />
      </div>
      <div className="post-form__content">
        <textarea
          className="post-form__input"
          style={{ minHeight: fieldMinHeight }}
          name="textContent"
          rows={1}
          value={textContent}
          placeholder={placeholder}
          onInput={inputHandler}
        />
        <div className="post-form__options">
          <Button
            type="submit"
            mods={['pull_right']}
            disabled={isDisabled}
          >
            Отправить
          </Button>
        </div>
      </div>
      {isLoading && (
        <LoadingMask
          size={50}
          bg="inherit"
          opacity={0.6}
        />
      )}
      {!isActivated && (
        <div className="post-form__auth-mask">
          <b>Вы не можете оставлять посты или комментарии</b>
          <div>
            Сперва необходимо&nbsp;
            <button
              type="button"
              className="post-form__auth-link"
              onClick={() => {
                modalStore.openModal(<ActivateAccountPopup />, {
                  heading: 'Активация аккаунта',
                });
              }}
            >
              активировать аккаунт
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default observer(PostForm);
