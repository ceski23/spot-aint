import s from './Sidebar.module.scss';
import { ReactComponent as SpotifyLogo } from 'assets/icons/spotify.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { ReactComponent as FavouritesIcon } from 'assets/icons/favourites.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserInfo } from 'store/user';
import { NavLink } from 'react-router-dom';
import { urls } from 'routes';
import propTypes from 'prop-types';
import clsx from 'clsx';

const navigationItems = [
  { text: 'Strona główna', icon: HomeIcon, path: urls.home },
  { text: 'Ulubione', icon: FavouritesIcon, path: urls.favourites },
];

export const Sidebar = ({ className }) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

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
        <img src={userInfo.image} className={s.image} alt={userInfo.display_name} />
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
    </div>
  )
}

Sidebar.propTypes = {
  className: propTypes.string,
}