import clsx from 'clsx';
import propTypes from 'prop-types';
import { ReactComponent as FavouritesIcon } from 'assets/icons/favourites.svg';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import { ReactComponent as PauseIcon } from 'assets/icons/pause.svg';
import { ReactComponent as PrevIcon } from 'assets/icons/prev.svg';
import { ReactComponent as NextIcon } from 'assets/icons/next.svg';
import { ReactComponent as VolumeDownIcon } from 'assets/icons/volume-down.svg';
import { ReactComponent as VolumeUpIcon } from 'assets/icons/volume-up.svg';
import s from './Player.module.scss';
import { Slider } from './Slider';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlaybackState, selectPlaybackVolume, setPlaybackState, setVolume } from 'store/player';
import { useSpotify } from 'hooks/useSpotify';
import useInterval from '@use-it/interval';
import { selectAccessToken } from 'store/user';
import api from 'api';
import { useQuery } from 'react-query';

export const Player = ({ className }) => {
  const accessToken = useSelector(selectAccessToken);
  const playbackState = useSelector(selectPlaybackState);
  const volume = useSelector(selectPlaybackVolume);
  const dispatch = useDispatch();
  const { player } = useSpotify(accessToken);

  const currentTrackId = useMemo(() => {
    return playbackState.current_track ? playbackState.current_track.id : undefined;
  }, [playbackState.current_track]);

  const { data: trackSaved } = useQuery(
    ['currentSaved', { id: currentTrackId }],
    () => api.tracks.checkIfSaved({ ids: [ currentTrackId ]}).then(tracks => tracks[0]),
    { enabled: !!currentTrackId }
  );

  useEffect(() => {
    console.log('saved', trackSaved);
  }, [trackSaved]);

  useEffect(() => {
    console.log('currentTrackId', currentTrackId);
  }, [currentTrackId]);

  const handlePositionChange = (position) => {
    player.current.seek(position);
  }

  const handleTogglePlay = () => {
    player.current.togglePlay();
  }

  const handlePrevClick = () => {
    player.current.previousTrack();
  }

  const handleNextClick = () => {
    player.current.nextTrack();
  }

  const handleToggleFavourite = () => {
    // if (playbackState.current_track)
  }

  const handleVolumeChange = (volume) => {
    dispatch(setVolume(volume));
    player.current.setVolume(volume / 100);
  }

  useEffect(() => {
    const handleStateChanged = (state) => {
      console.log(state);
      if (state) dispatch(setPlaybackState(state));
    }

    if (player.current) player.current.addListener('player_state_changed', handleStateChanged);

    return () => {
      if (player.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        player.current.removeListener('player_state_changed', handleStateChanged);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.current]);

  useInterval(() => {
    if (player.current) {
      player.current.getCurrentState().then((state) => {
        if (state) dispatch(setPlaybackState(state));
      });
    }
  }, playbackState.paused === true ? null : 1000);

  return (
    <div className={clsx(className, s.container)}>
      {playbackState.current_track && (
          <Slider
            className={s.seekSlider}
            min={0}
            max={playbackState.duration}
            value={playbackState.position}
            onValueChange={handlePositionChange}
          />
      )}

      <div className={s.track}>
        {playbackState.current_track && (
          <>
            <img className={s.cover} src={playbackState.current_track.album.images[0].url} alt={playbackState.current_track.name} />
            <div className={s.trackInfo}>
              <p className={s.trackName}>{playbackState.current_track.name}</p>
              <p className={s.tractArtist}>
                {playbackState.current_track.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
            
            {trackSaved !== undefined && (
              <FavouritesIcon className={clsx(s.favourite, { [s.saved]: trackSaved })} onClick={handleToggleFavourite} />
            )}
          </>
        )}
      </div>

      {playbackState.current_track && (
        <div className={s.playbackControl}>
          <button className={s.prev} onClick={handlePrevClick} disabled={playbackState.disallows.skipping_prev}>
            <PrevIcon />
          </button>

          <button className={s.play} onClick={handleTogglePlay}>
            {playbackState.paused ? <PlayIcon /> : <PauseIcon />}
          </button>
          
          <button className={s.next} onClick={handleNextClick} disabled={playbackState.disallows.skipping_next}>
            <NextIcon />
          </button>
        </div>
      )}

      <div className={s.volumeControl}>
        <VolumeDownIcon className={s.volumedown} />
        <Slider min={0} max={100} value={Number.parseInt(volume * 100)} onValueChange={handleVolumeChange} />
        <VolumeUpIcon className={s.volumeup} />
      </div>
    </div>
  )
}

Player.propTypes = {
  className: propTypes.string,
}