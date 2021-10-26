import { ReactComponent as SpotifyLogo } from 'assets/spotify.svg';
import { Button } from 'components/Button';
import s from './LoginPage.module.scss';

export const LoginPage = () => (
  <div className={s.container}>
    <div className={s.appHeader}>
      <SpotifyLogo className={s.logo} />
      <h1 className={s.appTitle}>Spotify AINT</h1>
    </div>

    <p className={s.info}>
      Aby móc korzystać z aplikacji musisz się zalogować
    </p>

    <Button>
      Zaloguj się
    </Button>
  </div>
);