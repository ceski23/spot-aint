import api from "api";
import { TracksList } from "components/TracksList";
import { useState } from "react";
import { useQuery } from "react-query";
import s from './FavouritesPage.module.scss';

const PER_PAGE = 7;

export const FavouritesPage = () => {
  const [offset, setOffset] = useState(0);

  const { data, isFetching, isPreviousData, isLoading } = useQuery(
    ['saved', { limit: PER_PAGE, offset }],
    () => api.tracks.getUserSavedTracks({ limit: PER_PAGE, offset }),
    { keepPreviousData: true }
  );

  const handleTrackClick = (track) => {
    const trackIdx = data.items.findIndex(item => item.track.uri === track.uri);
    const uris = data.items.map(item => item.track.uri);

    api.player.startPlayback({
      uris,
      offset: { position: trackIdx }
    });
  }

  return (
    <div className={s.container}>
      <h1 className={s.pageTitle}>Zapisane utwory</h1>
      
      <TracksList
        tracks={(data && !isPreviousData) ? data.items : []}
        isLoading={isLoading || (isFetching && isPreviousData)}
        limit={data ? data.limit : 0}
        total={data ? data.total : 0}
        offset={offset}
        changeOffset={setOffset}
        onTrackClick={handleTrackClick}
      />
    </div>
  );
}