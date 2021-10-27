import { LoginPage } from "views/LoginPage"
import { AuthCallback } from 'views/AuthCallback'
import { Redirect } from "react-router-dom"

export const urls = {
  authorize: '/callback',
  home: '/'
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
    component: () => <Redirect to={urls.home} />
  }
]