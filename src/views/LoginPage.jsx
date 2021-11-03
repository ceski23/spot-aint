import { ReactComponent as SpotifyLogo } from 'assets/icons/spotify.svg';
import { Button } from 'components/Button';
import { generateCodeChallenge, base64url, randomBytes } from 'utils';
import s from './LoginPage.module.scss';

export const LoginPage = () => {
  const handleClick = async () => {
    const code_verifier = base64url(randomBytes(96));

    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: await generateCodeChallenge(code_verifier),
    });

    window.sessionStorage.setItem('code_verifier', code_verifier);

    window.location = `https://accounts.spotify.com/authorize?${params}`;
  }

  return (
    <div className={s.container}>
      <div className={s.appHeader}>
        <SpotifyLogo className={s.logo} />
        <h1 className={s.appTitle}>Spotify AINT</h1>
      </div>
  
      <p className={s.info}>
        Aby móc korzystać z aplikacji musisz się zalogować
      </p>
  
      <Button onClick={handleClick}>
        Zaloguj się
      </Button>
    </div>
  );
}