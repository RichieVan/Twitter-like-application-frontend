import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLink } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmAction from '../popup/ConfirmAction';
import { APP_URL } from '../../http';

const PostOptions = ({show, owner, postId, type}) => {
    const {
        userStore, 
        postStore, 
        modalStore, 
        notificationStore,
        appStore
    } = useContext(Context);
    const navigate = useNavigate()
    const location = useLocation()

    const classList = [
        'list-container',
        show ? ' active' : ''
    ];

    const optionsList = {
        deletePost : userStore.user.id == owner,
        copyLink : type == 'postView' || type == 'post'
    }

    const showOptions = Object.keys(optionsList).filter(key => optionsList[key] != false).length > 0;

    return (
        <div className="options">
            {showOptions && (
                <div className="options-wrapper">
                    <button className="open-list" onClick={(e) => {
                        e.stopPropagation();
                        appStore.setActivePostOptions({id : postId, type});
                    }}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    <div className={classList.join('')} onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <ul className='list'>
                            {optionsList.copyLink && (
                                <li className="option">
                                    <button 
                                        className='option-link'
                                        onClick={e => {
                                            window.navigator.clipboard.writeText(APP_URL + '/post/' + postId)
                                                .then(() => {
                                                    notificationStore.show('Скопировано!', 2000, 'success')
                                                })
                                        }}
                                    >
                                        <i className="icon">
                                            <FontAwesomeIcon icon={faLink}/>
                                        </i>
                                        <span>Скопировать ссылку</span>
                                    </button>
                                </li>
                            )}
                            {optionsList.deletePost && (
                                <li className="option delete">
                                    <button className='option-link' onClick={() => {
                                        modalStore.openModal(
                                            <ConfirmAction 
                                                text={['Вы уверены что хотите удалить пост?', 'Это действие нельзя отменить.']}
                                                confirmText='Удалить'
                                                declineText='Отмена'
                                                confirmButtonStyles='fill error'
                                                confirmAction={() => {
                                                    return new Promise((resolve) => {
                                                        if (type == 'comment') {
                                                            postStore.deleteComment(postId).then(() => {
                                                                notificationStore.show('Комментарий удален', 2500, 'success')
                                                                resolve()
                                                            });
                                                        }
                                                        if (type == 'post') {
                                                            postStore.deletePost(postId).then(() => {
                                                                notificationStore.show('Пост удален', 2500, 'success')
                                                                resolve()
                                                            });
                                                        }
                                                        if (type == 'postView') {
                                                            postStore.deletePost(postId).then(() => {
                                                                notificationStore.show('Пост удален', 2500, 'success')
                                                                navigate(location.state.backgroundLocation)
                                                                resolve()
                                                            });
                                                        }
                                                    })
                                                }}
                                            />, 
                                            {
                                                heading : 'Подтвердите действие',
                                                temporal : true
                                            }
                                        );
                                    }}>
                                        <i className="icon">
                                            <FontAwesomeIcon icon={faLink}/>
                                        </i>
                                        <span>Удалить пост</span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default observer(PostOptions);