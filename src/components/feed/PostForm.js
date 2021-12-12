import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import { Context } from '../..';
import './style.css';
import LoadingMask from '../LoadingMask';
import { Link } from 'react-router-dom';
import ActivateAccountPopup from '../popup/ActivateAccount';

const PostForm = ({type = 'post', postId = null}) => {
    const {userStore, appStore, postStore, modalStore} = useContext(Context);
    const [textContent, setTextContent] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const textInput = useRef(null)

    const avatarStyles = {
        backgroundImage : `url(${(!userStore.user.avatar.url) ? appStore.apiUrl + '/uploads/avatar/default.png' : userStore.user.avatar.url})`
    }

    return (
        <div className={'post-form type-' + type}>
            {isLoading && (<LoadingMask cHeight={50} cWidth={50} bg='inherit' opacity={.6}/>)}
            {!userStore.isAuth && (
                <div className="auth-mask">
                    <b>Вы не можете оставлять посты или комментарии</b>
                    <div>Сперва необходимо&nbsp;
                        <b 
                            className='pseudo-link'
                            onClick={() => {
                                modalStore.openModal(<ActivateAccountPopup />, {
                                    heading : 'Активация аккаунта'
                                });
                            }}
                        >
                            активировать аккаунт
                        </b>
                    </div>
                </div>
            )}
            <div className='avatar-container'>
                <Link 
                    to={`/profile/${userStore.user.login}`} 
                    className='avatar' 
                    style={{backgroundImage : `url(${userStore.user.avatar.url})`}}
                ></Link>
            </div>
            <div className='post-content'>
                <div 
                    contentEditable={userStore.user.isActivated}
                    className='content-input'
                    ref={textInput}
                    onInput={(e) => {
                        //Фикс двойного переноса только для винды
                        const modifiedText = e.target.innerText.replaceAll(/(\n\n)/g, '\n');

                        if (modifiedText.replaceAll(/(\s)/g, '').length == 0) setDisabled(true);
                        else setDisabled(false);
                        
                        setTextContent(modifiedText);
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        let selection = document.getSelection();
                        let range = new Range();

                        range.setStart(selection.anchorNode, selection.anchorOffset);
                        range.setEnd(selection.focusNode, selection.focusOffset);

                        if ((range.startContainer == range.endContainer && selection.anchorNode !== selection.focusNode) || (selection.anchorNode == selection.focusNode && selection.anchorOffset > selection.focusOffset)) {
                            range.setStart(selection.focusNode, selection.focusOffset);
                            range.setEnd(selection.anchorNode, selection.anchorOffset);
                        }

                        const startContainer = range.startContainer;
                        const startOffset = range.startOffset;
                        const endContainer = range.endContainer;
                        let newTextContent;
                        
                        if (selection.anchorNode !== selection.focusNode) {
                            console.dir(range.startContainer);
                            console.dir(range.endContainer);
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
                            range.setStart(startContainer.firstChild, cbData.length)
                            range.setEnd(startContainer.firstChild, cbData.length)
                        } else {
                            range.setStart(startContainer, startOffset + cbData.length)
                            range.setEnd(startContainer, startOffset + cbData.length)
                        }

                        range.collapse(true);
                        document.getSelection().removeAllRanges();
                        document.getSelection().addRange(range);
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                    }}
                />
                <div className='options-container'>
                    <button className='btn to-right' disabled={isDisabled} onClick={async () => {
                        setDisabled(true);
                        setIsLoading(true);
                        
                        if (type == 'post') {
                            await postStore.createPost({
                                textContent, 
                                userId : userStore.user.id
                            });
                        }

                        if (type == 'comment') {
                            await postStore.createComment({
                                textContent, 
                                userId : userStore.user.id,
                                postId
                            });
                        }

                        setDisabled(false);
                        setIsLoading(false);
                        setTextContent('');
                        textInput.current.innerText = '';
                    }}>Отправить</button>
                </div>
            </div>
        </div>
    );
}

export default observer(PostForm);