import api, { updateAuthHeader } from 'api';
import { Player } from 'components/Player';
import { Sidebar } from 'components/Sidebar';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { guestRoutes, routes } from 'routes';
import {
  selectAccessToken,
  selectUserInfo,
  setUserInfo
} from 'store/user';
import s from './App.module.scss';

const App = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { premium } = useSelector(selectUserInfo);

  useLayoutEffect(() => {
    updateAuthHeader(accessToken);
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      api.user.getMe().then(res => dispatch(setUserInfo(res)));
    }
  }, [accessToken, dispatch]);

  return (
    <HashRouter>
      <div className={s.container}>
        {!accessToken ? renderRoutes(guestRoutes) : (!loading) ? (
          <>
            <Sidebar className={s.sidebar} />
            {renderRoutes(routes)}
            {premium && <Player className={s.player} />}
          </>
        ) : null}
      </div>
    </HashRouter>
  );
}

export default App;