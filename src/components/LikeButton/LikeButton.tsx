import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import { Context } from '../../Context';
import PanelButton from '../PanelButton/PanelButton';
import { LikeButtonProps } from './types';
import PostService from '../../services/PostService';

const LikeButton: FC<LikeButtonProps> = ({
  postData,
  mods = [],
}) => {
  const { userStore, notificationStore } = useContext(Context);
  const [liked, setLiked] = useState(postData.currentUserLiked);
  const [tempLikesValue, setTempLikesValue] = useState<number | null>(null);
  const [count, setCount] = useState<number>(postData.likesCount);
  const isLikedNow = useRef(false);

  useEffect(() => {
    setLiked(postData.currentUserLiked);
    setCount(postData.likesCount);
  }, [postData]);

  const classMods = ['type_like'].concat(mods);
  if (liked && isLikedNow.current) classMods.push('liked');

  const clickHandler = () => {
    if (userStore.isAuth) {
      if (liked) {
        setLiked(false);
        setTempLikesValue(count - 1);

        PostService
          .unlike(postData.id)
          .then(({ data }) => {
            setCount(data);
            setTempLikesValue(null);
          });
      } else {
        isLikedNow.current = true;
        setLiked(true);
        setTempLikesValue(count + 1);

        PostService
          .like(postData.id)
          .then(({ data }) => {
            setCount(data);
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
