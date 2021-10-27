import { client } from "api";

export const completeLogin = async () => {
  const params = new URLSearchParams(window.location.search);
  const code_verifier = window.sessionStorage.getItem('code_verifier');

  const data = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code: params.get('code'),
    redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    code_verifier: code_verifier,
  });

  const response = await client.post('https://accounts.spotify.com/api/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data;
}