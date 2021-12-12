import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react';
import { Context } from '../..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';

import './style.css';
import PostOptions from './PostOptions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';
import LoadingMask from '../LoadingMask';
import FormatPostText from '../../lib/formatPostText.js';
import PostForm from './PostForm';
import CommentsList from './CommentsList';
import LikeButton from './buttons/like';
import CommentButton from './buttons/comments';

const PostView = () => {
    const {userStore, appStore, postStore, notificationStore} = useContext(Context);
    const [postData, setPostData] = useState(null);
    const isFirstLoading = useRef(true);
    const params = useParams();
    const navigate = useNavigate()
    const location = useLocation()

    if (isFirstLoading.current) {
        PostService.getById(params.id)
            .then(result => {
                if (!result.data) {
                    notificationStore.show('Пост не найден', 3000);
                    navigate(location.state?.backgroundLocation || '/feed');
                } else {
                    isFirstLoading.current = false;
                    setPostData(Object.assign(result.data, {contentArray : FormatPostText(result.data.textContent)}));
                }
            });
    }

    if (isFirstLoading.current) {
        return (
            <div className="post-view">
                <LoadingMask cHeight={50} cWidth={50} bg='inherit' opacity={1}/>
            </div>
        )
    }

    return (
        <div className="post-view">
            <article className='post-view_content'>
                <div className="content-wrapper">
                    <div className='heading'>
                        <div className='avatar-container'>
                            <div className='avatar' style={{backgroundImage : `url(${postData.user.id == userStore.user.id ? userStore.user.avatar.url : postData.user.avatar.url})`}}></div>
                        </div>
                        <div className="post-info">
                            <div className="d-flex">
                                <Link to={`/profile/${postData.user.login}`} className='profile-name'>{postData.user.username}</Link>
                                <div className='datetime-created' title={postData.createdAt.title}>{postData.createdAt.view}</div>
                            </div>
                            <div className="profile-tag">{`@${postData.user.login}`}</div>
                        </div>
                    </div>
                    <div className='post-contents'>
                        <div className='content'>
                            {postData.contentArray}
                        </div>
                    </div>
                </div>
                <PostOptions show={appStore.activePostOptions?.id == postData.id && appStore.activePostOptions?.type == 'postView'} owner={postData.user.id} postId={postData.id} type={'postView'}/>
                <div className="bottom-panel">
                    <LikeButton componentData={postData} setComponentData={setPostData}/>
                    <CommentButton componentData={postData} isNavigate={false}/>
                    <button className="repost" title='Скопировать ссылку'>
                        <FontAwesomeIcon icon={faRetweet} />
                    </button>
                </div>
            </article>
            {userStore.isAuth && (
                <PostForm type='comment' postId={postData.id}/>
            )}
            <div className="comments">
                <CommentsList postId={params.id} postOwner={postData.user}/>
            </div>
        </div>
    );
}

export default observer(PostView);