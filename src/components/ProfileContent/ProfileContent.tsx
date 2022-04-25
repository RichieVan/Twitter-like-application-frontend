import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Context } from '../../Context';
import UserService from '../../services/UserService';
import { ExtendedUserData } from '../../types/types';
import LoadingMask from '../LoadingMask/LoadingMask';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePostsController from '../ProfilePostsController/ProfilePostsController';
import { ProfileContentProps } from './types';

const ProfileContent: FC<ProfileContentProps> = ({
  username,
}) => {
  const { userStore } = useContext(Context);
  const [userData, setUserData] = useState<ExtendedUserData | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (userStore.user && username === userStore.user?.login && isMounted) {
      setUserData(userStore.user);
    } else {
      UserService
        .getUserData(username)
        .then(({ data }) => {
          if (isMounted) setUserData(data);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [userStore.user, username]);

  if (!userData) {
    return (
      <div className="profile">
        <LoadingMask
          size={70}
          bg="main"
          opacity={1}
        />
      </div>
    );
  }

  return (
    <div className="profile">
      <ProfileHeader userData={userData} />
      <ProfilePostsController key={userData.id} userData={userData} />
    </div>
  );
};

export default ProfileContent;
