import api from 'api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from 'store/user';

export const AuthCallback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    api.auth.completeLogin().then(res => {
      const { access_token, refresh_token } = res;
      dispatch(setAuthData({ access_token, refresh_token }));
    });
  }, [dispatch]);

  return <></>
}