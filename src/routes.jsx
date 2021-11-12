import { LoginPage } from "views/LoginPage"
import { AuthCallback } from 'views/AuthCallback'
import { Redirect } from "react-router-dom"
import { HomePage } from "views/HomePage"
import { FavouritesPage } from "views/FavouritesPage"

export const urls = {
  authorize: '/callback',
  home: '/',
  favourites: '/favourites'
}

export const guestRoutes = [
  {
    path: urls.authorize,
    component: AuthCallback,
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
    component: () => <Redirect to={urls.home} />
  }
]