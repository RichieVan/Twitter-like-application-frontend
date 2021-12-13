import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../..';

import './style.css';
import PostOptions from './PostOptions';
import { Link } from 'react-router-dom';
import LikeButton from './buttons/like';

const PostComment = ({data, contentArray, postOwner}) => {
    const {userStore, appStore} = useContext(Context);
    const [commentData, setCommentData] = useState({...data});

    return (
        <div className='post comment'>
            <div className="content-wrapper">
                <div className='avatar-container'>
                    <Link 
                        className='avatar' 
                        style={{backgroundImage : `url(${commentData.user.id == userStore.user.id ? userStore.user.avatar.url : commentData.user.avatar.url})`}}
                        to={`/profile/${commentData.user.login}`}
                    >
                    </Link>
                </div>
                <div className='post-contents'>
                    <div className='heading'>
                        <div className="d-flex">
                            <Link to={`/profile/${commentData.user.login}`} className='profile-name'>{commentData.user.username}</Link>
                            <div className='datetime-created' title={commentData.createdAt.title}>{commentData.createdAt.view}</div>
                        </div>
                        <div className="answer-to">В ответ <Link to={`/profile/${postOwner.login}`}>{`@${postOwner.login}`}</Link></div>
                    </div>
                    <div className='content'>
                        {contentArray}
                    </div>
                </div>
            </div>
            <PostOptions show={appStore.activePostOptions?.id == commentData.id && appStore.activePostOptions?.type == 'comment'} owner={commentData.user.id} postId={commentData.id} type={'comment'}/>
            <div className="bottom-panel">
                <LikeButton componentData={commentData} setComponentData={setCommentData} />
            </div>
        </div>
    )
}

export default observer(PostComment);