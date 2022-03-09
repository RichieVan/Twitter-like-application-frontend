import React, { useContext, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import './style.css';
import LoadingMask from '../LoadingMask';
import ActivateAccountPopup from '../popup/ActivateAccount';
import { Context } from '../..';

function PostForm({ type = 'post', postId = null }) {
  const { userStore, postStore, modalStore } = useContext(Context);
  const [textContent, setTextContent] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const textInput = useRef(null);

  const buttonClickHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setIsLoading(true);

    if (type === 'post') {
      await postStore.createPost({
        textContent,
        userId: userStore.user.id,
      });
    }

    if (type === 'comment') {
      await postStore.createComment({
        textContent,
        userId: userStore.user.id,
        postId,
      });
    }

    setDisabled(false);
    setIsLoading(false);
    setTextContent('');
    textInput.current.innerText = '';
  };

  return (
    <div className={`post-form type-${type}`}>
      {isLoading && (<LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={0.6} />)}
      {!userStore.user.isActivated && (
        <div className="auth-mask">
          <b>Вы не можете оставлять посты или комментарии</b>
          <div>
            Сперва необходимо&nbsp;
            <b
              className="pseudo-link"
              onClick={() => {
                modalStore.openModal(<ActivateAccountPopup />, {
                  heading: 'Активация аккаунта',
                });
              }}
            >
              активировать аккаунт
            </b>
          </div>
        </div>
      )}
      <div className="avatar-container">
        <Link
          to={`/profile/${userStore.user.login}`}
          className="avatar"
          style={{ backgroundImage: `url(${userStore.user.avatar.url})` }}
        />
      </div>
      <div className="post-content">
        <div
          contentEditable={userStore.user.isActivated}
          className="content-input"
          ref={textInput}
          onInput={(e) => {
            // Фикс двойного переноса только для винды
            const modifiedText = e.target.innerText.replaceAll(/(\n\n)/g, '\n');

            if (modifiedText.replaceAll(/(\s)/g, '').length === 0) setDisabled(true);
            else setDisabled(false);

            setTextContent(modifiedText);
          }}
          onPaste={(e) => {
            e.preventDefault();
            const selection = document.getSelection();
            const range = new Range();

            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.setEnd(selection.focusNode, selection.focusOffset);

            if ((range.startContainer == range.endContainer && selection.anchorNode !== selection.focusNode) || (selection.anchorNode == selection.focusNode && selection.anchorOffset > selection.focusOffset)) {
              range.setStart(selection.focusNode, selection.focusOffset);
              range.setEnd(selection.anchorNode, selection.anchorOffset);
            }

            const { startContainer, startOffset, endContainer } = range;
            let newTextContent;

            if (selection.anchorNode !== selection.focusNode) {
              newTextContent = range.startContainer.textContent + range.endContainer.textContent;

              range.deleteContents();

              newTextContent = startContainer.textContent + endContainer.textContent;
              startContainer.textContent = newTextContent;
              endContainer.remove();
            } else {
              range.deleteContents();
            }

            const cbData = e.clipboardData.getData('text/plain');
            startContainer.textContent = startContainer.textContent.substring(0, startOffset) + cbData + startContainer.textContent.substring(startOffset);

            if (startContainer == textInput.current) {
              range.setStart(startContainer.firstChild, cbData.length);
              range.setEnd(startContainer.firstChild, cbData.length);
            } else {
              range.setStart(startContainer, startOffset + cbData.length);
              range.setEnd(startContainer, startOffset + cbData.length);
            }

            range.collapse(true);
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);
          }}
          onDrop={(e) => {
            e.preventDefault();
          }}
        />
        <div className="options-container">
          <button
            type="submit"
            className="btn to-right"
            disabled={isDisabled}
            onClick={async (e) => buttonClickHandler(e)}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(PostForm);
