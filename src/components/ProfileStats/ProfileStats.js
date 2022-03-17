import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../Context';
import LoadingMask from '../LoadingMask/LoadingMask';

function ProfileStats({ userData }) {
  const { userStore } = useContext(Context);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userStore.getProfileStats(userData.id)
      .then((res) => {
        setStats(res);
        setLoading(false);
      });
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
      {loading && <LoadingMask cHeight={40} cWidth={40} bg="var(--bg1)" opacity={1} />}
    </div>
  );
}

export default ProfileStats;
