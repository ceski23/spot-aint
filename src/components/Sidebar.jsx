import s from './Sidebar.module.scss';
import { ReactComponent as SpotifyLogo } from 'assets/icons/spotify.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { ReactComponent as FavouritesIcon } from 'assets/icons/favourites.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserInfo } from 'store/user';
import { NavLink } from 'react-router-dom';
import { urls } from 'routes';
import propTypes from 'prop-types';
import clsx from 'clsx';
import { useQuery } from 'react-query';
import api from 'api';
import { reverse } from 'named-urls';

const navigationItems = [
  { text: 'Strona główna', icon: HomeIcon, path: urls.home },
  { text: 'Wyszukiwanie', icon: SearchIcon, path: urls.search },
  { text: 'Ulubione', icon: FavouritesIcon, path: urls.favourites },
];

export const Sidebar = ({ className }) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const { data: playlists } = useQuery(
    ['playlists'],
    () => api.playlists.getUserPlaylists({}),
  );

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <div className={clsx(s.sidebar, className)}>
      <div className={s.appHeader}>
        <SpotifyLogo className={s.logo} />
        <p className={s.appTitle}>Spotify AINT</p>
      </div>

      <div className={s.user}>
        {userInfo.images && <img src={userInfo.image} className={s.image} alt={userInfo.display_name} />}
        <p className={s.name}>{userInfo.display_name}</p>
      </div>

      <div className={s.navigation}>
        {navigationItems.map(({ text, icon: Icon, path }) => (
          <NavLink to={path} activeClassName={s.active} className={s.item} exact key={path}>
            <Icon className={s.icon} />
            <span className={s.text}>{text}</span>
          </NavLink>
        ))}

        <button className={s.item} onClick={handleLogoutClick}>
          <LogoutIcon className={s.icon} />
          <span className={s.text}>Wyloguj</span>
        </button>
      </div>

      <div className={s.playlists}>
        {playlists && playlists.items.map(playlist => (
          <NavLink to={reverse(urls.playlist, { id: playlist.id })} className={s.playlist} key={playlist.id}>
            <img src={playlist.images[0].url} className={s.image} alt={playlist.name} />
            <p className={s.name}>{playlist.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  className: propTypes.string,
}