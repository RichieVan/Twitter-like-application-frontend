import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { asyncUserLogin, asyncUserLogout } from '../store/reducers/userReducer/userReducer';

const Reduxtest = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(userData);
  });

  const loginHandler = () => {
    dispatch(asyncUserLogin({
      loginOrEmail: 'clown789',
      password: '1231231',
    }));
  };

  const logoutHandler = () => {
    dispatch(asyncUserLogout());
  };

  return (
    <div style={{
      position: 'relative',
      zIndex: 10000,
    }}
    >
      <button
        type="button"
        onClick={loginHandler}
      >
        login
      </button>
      <button
        type="button"
        onClick={logoutHandler}
      >
        logout
      </button>
    </div>
  );
};

export default Reduxtest;
