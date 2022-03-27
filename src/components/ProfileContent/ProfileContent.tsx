import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Context } from '../../Context';
import { ExtendedUserData } from '../../types/types';
import LoadingMask from '../LoadingMask/LoadingMask';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePostsList from '../ProfilePostsList/ProfilePostsList';
import { ProfileContentProps } from './types';

const ProfileContent: FC<ProfileContentProps> = ({
  username,
}) => {
  const { userStore } = useContext(Context);
  const [userData, setUserData] = useState<ExtendedUserData | null>(null);

  const effectDeps = [];
  if (username === userStore.user?.login) effectDeps.push(userStore.user);

  useEffect(() => {
    if (userStore.user && username === userStore.user?.login) {
      setUserData(userStore.user);
    } else {
      userStore
        .getUserData(username)
        .then((result) => setUserData(result));
    }
  }, effectDeps);

  if (!userData) {
    return (
      <div className="profile">
        <LoadingMask cHeight={70} cWidth={70} bg="#0f0f0f" opacity={0.8} />
      </div>
    );
  }

  return (
    <div className="profile">
      <ProfileHeader userData={userData} />
      <ProfilePostsList key={userData.id} userData={userData} />
    </div>
  );
};

export default ProfileContent;
