import api from 'api';
import { useEffect, useCallback, useRef, useState } from 'react';

export const waitForSpotifyWebPlaybackSDKToLoad = async () => (
  new Promise((resolve) => {
    if (window.Spotify) resolve(window.Spotify);
    else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
    }
  })
);

export const useSpotify = (accessToken) => {
  const player = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const setupPlayer = useCallback(async () => {
    try {
      if (!player.current && accessToken) {
        const sdk = await waitForSpotifyWebPlaybackSDKToLoad();

        player.current = new sdk.Player({
          name: 'spot-aint',
          getOAuthToken: (callback: (token: string) => void) => callback(accessToken),
          volume: 0.5
        });

        player.current.on('initialization_error', ({ message }: any) => { alert(message); });
        player.current.on('authentication_error', ({ message }: any) => { alert(message); });
        player.current.on('account_error', () => { alert('Odtwarzanie muzyki jest dostępne tylko dla użytkowników z kontem premium'); });
        player.current.on('playback_error', ({ message }: any) => { alert(message); });

        const connected = await player.current.connect();

        if (connected) {
          player.current.addListener('ready', ({ device_id }: any) => {
            setIsReady(true);
            api.player.transferPlayback({ deviceId: device_id });
            player.current.removeListener('ready');
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

  useEffect(() => {
    setupPlayer();

    return () => {
      if (player.current) player.current.disconnect();
    }
  }, [setupPlayer]);

  return {
    player,
    isReady
  }
};
