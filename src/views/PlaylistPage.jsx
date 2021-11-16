import api from "api";
import { TracksList } from "components/TracksList";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import s from './PlaylistPage.module.scss';

const PER_PAGE = 7;

export const PlaylistPage = () => {
  const [offset, setOffset] = useState(0);
  const { id } = useParams();

  const { data: tracks, isFetching, isPreviousData, isLoading } = useQuery(
    ['playlistTracks', { id, limit: PER_PAGE, offset }],
    () => api.playlists.getPlaylistTracks({ id, limit: PER_PAGE, offset }),
    { keepPreviousData: true }
  );

  const { data: playlistInfo } = useQuery(
    ['playlist', { id }],
    () => api.playlists.getPlaylist({ id }),
  );

  const handleTrackClick = (track) => {
    const trackIdx = tracks.items.findIndex(item => item.track.uri === track.uri);

    api.player.playPlaylist({
      uri: playlistInfo.uri,
      offset: { position: trackIdx + offset }
    });
  }

  return (
    <div className={s.container}>
      <h1 className={s.pageTitle}>
        {playlistInfo ? playlistInfo.name : ' '}
      </h1>
      
      <TracksList
        tracks={(tracks && !isPreviousData) ? tracks.items : []}
        isLoading={isLoading || (isFetching && isPreviousData)}
        limit={tracks ? tracks.limit : 0}
        total={tracks ? tracks.total : 0}
        offset={offset}
        changeOffset={setOffset}
        onTrackClick={handleTrackClick}
      />
    </div>
  );
}