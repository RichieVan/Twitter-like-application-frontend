import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../Context';
import UserService from '../../services/UserService';
import { ExtendedUserData } from '../../types/types';
import LoadingMask from '../LoadingMask/LoadingMask';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileStats from '../ProfileStats/ProfileStats';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfilePostsController from '../ProfilePostsController/ProfilePostsController';
import { ProfileProps } from './types';
import { useNavigate } from 'react-router-dom';

const Profile: FC<ProfileProps> = ({
  username = '',
}) => {
  const { userStore, notificationStore } = useContext(Context);
  const [userData, setUserData] = useState<ExtendedUserData>();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (userStore.user && username === userStore.user?.login && isMounted) {
      setUserData(userStore.user);
    } else {
      UserService
        .getUserData(username)
        .then(({ data }) => {
          if (isMounted) {
            if (!data) {
              notificationStore.show('Профиль не найден', 3000, 'error');
              navigate('/');
            } else {
              setUserData(data);
            }
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [userStore.user, username]);

  return (
    <div className="profile">
      {!userData ? (
        <LoadingMask
          size={70}
          bg="main"
          opacity={1}
        />
      ) : (
        <>
          <div className="profile__top">
            <ProfileHeader userData={userData} />
            <ProfileStats userData={userData} />
            <ProfileInfo
              userData={userData}
              showSubscribeButton={!!userStore.user && username !== userStore.user?.login}
            />
          </div>
          <div className="profile__posts">
            <ProfilePostsController key={userData.id} userData={userData} />
          </div>
        </>
      )}
    </div>
  );
};

export default observer(Profile);
