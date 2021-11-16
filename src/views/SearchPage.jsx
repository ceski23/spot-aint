import api from "api";
import { TracksList } from "components/TracksList";
import { useState } from "react";
import { useQuery } from "react-query";
import s from './SearchPage.module.scss';
import { useDebounce } from 'use-debounce';

const PER_PAGE = 25;

export const SearchPage = () => {
  const [value, setValue] = useState('');
  const [query] = useDebounce(value, 1000);

  const { data: tracks, isFetching, isPreviousData, isLoading } = useQuery(
    ['search', { query, limit: PER_PAGE }],
    () => api.search.searchSong({ query, limit: PER_PAGE }),
    { enabled: query.length > 0 }
  );

  const handleTrackClick = (track) => {
    const trackIdx = tracks.items.findIndex(item => item.uri === track.uri);
    const uris = tracks.items.map(item => item.uri);
    
    api.player.startPlayback({
      uris,
      offset: { position: trackIdx }
    });
  }

  return (
    <div className={s.container}>
      <h1 className={s.pageTitle}>Wyszukiwanie</h1>

      <input
        type="search"
        className={s.searchBar}
        placeholder="Podaj nazwę utworu..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      
      <TracksList
        tracks={(tracks && !isPreviousData) ? tracks.items : []}
        isLoading={isLoading || (isFetching && isPreviousData)}
        limit={tracks ? tracks.limit : 0}
        total={tracks ? tracks.total : 0}
        onTrackClick={handleTrackClick}
        isAltTracks={true}
      />
    </div>
  );
}