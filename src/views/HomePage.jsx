import api from "api";
import { reverse } from "named-urls";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { urls } from "routes";
import s from './HomePage.module.scss';

export const HomePage = () => {
  const { data, isLoading } = useQuery(
    ['featuredPlaylists'],
    () => api.playlists.getFeaturedPlaylists({ limit: 50 }),
  );

  return (
    <div className={s.container}>
      <h1 className={s.pageTitle}>Polecane</h1>

      {isLoading && (
        <div className={s.loadingWrapper}>
          <p className={s.loading}>Ładowanie...</p>
        </div>
      )}
      
      <div className={s.featuredPlaylists}>
        {data && data.playlists.items.map(playlist => (
          <NavLink className={s.playlist} to={reverse(urls.playlist, { id: playlist.id })} key={playlist.id}>
            <img src={playlist.images?.[0]?.url} className={s.image} alt={playlist.name} />
            <p className={s.name}>{playlist.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}