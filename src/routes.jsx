import { LoginPage } from "views/LoginPage"
import { AuthCallback } from 'views/AuthCallback'
import { Redirect } from "react-router-dom"
import { HomePage } from "views/HomePage"
import { FavouritesPage } from "views/FavouritesPage"
import { PlaylistPage } from "views/PlaylistPage"
import { SearchPage } from "views/SearchPage"

export const urls = {
  authorize: '/',
  home: '/',
  favourites: '/favourites',
  playlist: '/playlist/:id',
  search: '/search'
}

export const guestRoutes = [
  {
    path: urls.authorize,
    component: () => {
      const params = new URLSearchParams(window.location.search);
      return params.get('code') ? <AuthCallback /> : <LoginPage />
    }
  },
  {
    path: urls.home,
    exact: true,
    component: LoginPage
  },
  {
    component: () => <Redirect to={urls.home} />
  }
]

export const routes = [
  {
    path: urls.home,
    exact: true,
    component: HomePage
  },
  {
    path: urls.favourites,
    component: FavouritesPage
  },
  {
    path: urls.playlist,
    component: PlaylistPage
  },
  {
    path: urls.search,
    component: SearchPage
  },
  {
    component: () => <Redirect to={urls.home} />
  }
]