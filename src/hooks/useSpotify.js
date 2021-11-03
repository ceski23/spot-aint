import { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/user';

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

export const useSpotify = () => {
  const player = useRef(null);
  const accessToken = useSelector(selectAccessToken);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const playerReadyListener = ({ device_id }) => {
      console.info('Player ready', device_id);
    };

    const stateChangedListener = (currentState?: State) => {
      if (currentState && currentState.track_window.current_track) {
        console.info('State changed', currentState);
      }
    };

    if (player.current) {
      player.current.addListener('player_state_changed', stateChangedListener);
      player.current.addListener('ready', playerReadyListener);
    }

    return () => {
      if (player.current) {
        player.current.removeListener('player_state_changed', stateChangedListener);
        player.current.removeListener('ready', playerReadyListener);
      }
    };
  }, [player]);

  const setupPlayer = useCallback(async () => {
    try {
      if (!player.current && accessToken) {
        const sdk = await waitForSpotifyWebPlaybackSDKToLoad();

        player.current = new sdk.Player({
          name: 'spot-aint',
          getOAuthToken: (callback: (token: string) => void) => callback(accessToken),
        });

        player.current.on('initialization_error', ({ message }: any) => { alert(message); });
        player.current.on('authentication_error', ({ message }: any) => { alert(message); });
        player.current.on('account_error', ({ message }: any) => { alert(message); });
        player.current.on('playback_error', ({ message }: any) => { alert(message); });

        const connected = await player.current.connect();

        if (connected) {
          player.current.addListener('ready', ({ device_id }: any) => {
            setIsReady(true);
            player.current.removeListener('ready');
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

  useEffect(() => { setupPlayer(); }, [setupPlayer]);

  return {
    player,
    isReady
  }
};
