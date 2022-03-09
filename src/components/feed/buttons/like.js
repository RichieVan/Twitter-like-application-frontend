import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import { Context } from '../../..';

function LikeButton({ componentData, setComponentData }) {
  const { userStore, postStore, notificationStore } = useContext(Context);
  const [likedByUser, setLikedByUser] = useState(componentData.currentUserLiked);
  const [tempLikesValue, setTempLikesValue] = useState(false);
  const likedNow = useRef(false);

  useEffect(() => {
    setLikedByUser(componentData.currentUserLiked);
  }, [componentData]);

  const clickHandler = () => {
    if (userStore.isAuth) {
      if (likedByUser) {
        setLikedByUser(false);
        setTempLikesValue(parseInt(componentData.likesCount, 10) - 1);

        postStore.unlikePost(componentData.id).then((likesCount) => {
          setComponentData(Object.assign(componentData, { likesCount }));
          setTempLikesValue(false);
        });
      } else {
        likedNow.current = true;
        setLikedByUser(true);
        setTempLikesValue(parseInt(componentData.likesCount, 10) + 1);

        postStore.likePost(componentData.id).then((likesCount) => {
          setComponentData(Object.assign(componentData, { likesCount }));
          setTempLikesValue(false);
        });
      }
    } else {
      notificationStore.show('Войдите в аккаунт чтобы ставить лайки!', 3000, 'error');
    }
  };

  const getLikesCount = () => {
    let result;
    if (tempLikesValue !== false) result = tempLikesValue > 0 ? tempLikesValue : '';
    else result = componentData.likesCount > 0 ? componentData.likesCount : '';
    return result;
  };

  return (
    <button
      type="button"
      className={`like${likedNow.current && likedByUser ? ' liked' : ''}`}
      onClick={() => clickHandler()}
    >
      <div className="bpbutton_wrapper">
        <FontAwesomeIcon icon={likedByUser ? faHeart : faHeartRegular} />
        <span>{getLikesCount()}</span>
      </div>
    </button>
  );
}

export default LikeButton;
