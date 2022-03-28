import React, {
  FC,
  useContext,
  useRef,
  useState,
} from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import { Context } from '../../Context';
import PanelButton from '../PanelButton/PanelButton';
import { LikeButtonProps } from './types';

const LikeButton: FC<LikeButtonProps> = ({
  postData,
  mods = [],
}) => {
  const { userStore, postStore, notificationStore } = useContext(Context);
  const [liked, setLiked] = useState(postData.currentUserLiked);
  const [tempLikesValue, setTempLikesValue] = useState<number | null>(null);
  const [count, setCount] = useState<number>(postData.likesCount);
  const isLikedNow = useRef(false);

  const classMods = ['type_like'].concat(mods);
  if (liked && isLikedNow.current) classMods.push('liked');

  const clickHandler = () => {
    if (userStore.isAuth) {
      if (liked) {
        setLiked(false);
        setTempLikesValue(count - 1);

        postStore
          .unlikePost(postData.id)
          .then((likesCount) => {
            setCount(likesCount);
            setTempLikesValue(null);
          });
      } else {
        isLikedNow.current = true;
        setLiked(true);
        setTempLikesValue(count + 1);

        postStore
          .likePost(postData.id)
          .then((likesCount) => {
            setCount(likesCount);
            setTempLikesValue(null);
          });
      }
    } else {
      notificationStore.show('Войдите в аккаунт чтобы ставить лайки!', 3000, 'error');
    }
  };

  const getLikesCount = () => {
    let result;
    if (tempLikesValue !== null) result = tempLikesValue > 0 ? tempLikesValue : '';
    else result = count > 0 ? count : '';
    return result;
  };

  return (
    <PanelButton
      mods={classMods}
      clickHandler={clickHandler}
      icon={liked ? faHeart : faHeartRegular}
    >
      {getLikesCount()}
    </PanelButton>
  );
};

export default LikeButton;
