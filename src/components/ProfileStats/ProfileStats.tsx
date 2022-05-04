import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import UserService from '../../services/UserService';
import { ProfileStatsData } from '../../types/types';
import LoadingMask from '../LoadingMask/LoadingMask';
import { ProfileStatsProps } from './types';

const ProfileStats: FC<ProfileStatsProps> = ({
  userData,
}) => {
  const [stats, setStats] = useState<ProfileStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    UserService
      .getProfileStats(userData.id)
      .then(({ data }) => {
        if (isMounted) {
          setStats(data);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userData]);

  return (
    <div className="profile-stats">
      <div className="profile-stats__wrapper row">
        <div className="profile-stats__stat col-4">
          <div className="profile-stats__stat-inner stat">
            <span>Постов</span>
            <b>{stats?.postsCount || 0}</b>
          </div>
        </div>
        <div className="profile-stats__stat col-4">
          <div className="profile-stats__stat-inner stat">
            <span>Подписчиков</span>
            <b>{stats?.subsFromCount || 0}</b>
          </div>
        </div>
        <div className="profile-stats__stat col-4">
          <div className="profile-stats__stat-inner stat">
            <span>Подписок</span>
            <b>{stats?.subsToCount || 0}</b>
          </div>
        </div>
      </div>
      {loading && (
        <LoadingMask
          size={40}
          bg="main"
          weight="clear"
          opacity={1}
        />
      )}
    </div>
  );
};

export default ProfileStats;
