import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from "../../..";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const LikeButton = ({componentData, setComponentData}) => {
    const {userStore, postStore, notificationStore} = useContext(Context);
    const [likedByUser, setLikedByUser] = useState(componentData.currentUserLiked);
    const [tempLikesValue, setTempLikesValue] = useState(false);
    const likedNow = useRef(false);

    useEffect(() => {
        setLikedByUser(componentData.currentUserLiked);
    }, [componentData])

    return (
        <button 
            className={"like" + (likedNow.current && likedByUser ? ' liked' : '')}
            onClick={() => {
                if (userStore.isAuth) {
                    if (likedByUser) {
                        setLikedByUser(false);
                        setTempLikesValue(parseInt(componentData.likesCount) - 1)
    
                        postStore.unlikePost(componentData.id).then(likesCount => {
                            setComponentData(Object.assign(componentData, {likesCount}))
                            setTempLikesValue(false)
                        })
                    }
                    else {
                        likedNow.current = true;
                        setLikedByUser(true)
                        setTempLikesValue(parseInt(componentData.likesCount) + 1)
                        
                        postStore.likePost(componentData.id).then(likesCount => {
                            setComponentData(Object.assign(componentData, {likesCount}))
                            setTempLikesValue(false)
                        })
                    }
                } else {
                    notificationStore.show('Войдите в аккаунт чтобы ставить лайки!', 3000, 'error')
                }
            }}
        >
            <div className="bpbutton_wrapper">
                <FontAwesomeIcon icon={likedByUser ? faHeart : faHeartRegular} />
                <span>{tempLikesValue !== false ? (tempLikesValue > 0 ? tempLikesValue : '') : (componentData.likesCount > 0 ? componentData.likesCount : '')}</span>
            </div>
        </button>
    )
}

export default LikeButton;