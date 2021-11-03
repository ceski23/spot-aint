import s from './Sidebar.module.scss';
import { ReactComponent as SpotifyLogo } from 'assets/icons/spotify.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'store/user';
import { NavLink } from 'react-router-dom';
import { urls } from 'routes';

const navigationItems = [
  { text: 'Strona główna', icon: HomeIcon, path: urls.home },
];

export const Sidebar = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className={s.sidebar}>
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
      </div>
    </div>
  )
}