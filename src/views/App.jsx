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
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (accessToken && userInfo?.premium === false) alert('Odtwarzanie muzyki jest dostępne tylko dla użytkowników z kontem premium');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

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
            {userInfo?.premium && <Player className={s.player} />}
          </>
        ) : null}
      </div>
    </HashRouter>
  );
}

export default App;