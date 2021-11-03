import api, { updateAuthHeader } from 'api';
import { Sidebar } from 'components/Sidebar';
import { useSpotify } from 'hooks/useSpotify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { guestRoutes, routes } from 'routes';
import {
  selectAccessToken,
  setUserInfo
} from 'store/user';
import s from './App.module.scss';

const App = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    updateAuthHeader(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      api.user.getMe().then(res => dispatch(setUserInfo(res)));
    }
  }, [accessToken, dispatch]);

  return (
    <BrowserRouter>
      <div className={s.container}>
        {!accessToken ? (
          renderRoutes(guestRoutes)
        ) : (
          <LoggedInContext>
            <Sidebar />
            {renderRoutes(routes)}
          </LoggedInContext>
        )}
      </div>
    </BrowserRouter>
  );
}

export const LoggedInContext = ({ children }) => {
  useSpotify();

  return children;
}

export default App;