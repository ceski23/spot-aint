import axios from "axios";
import * as auth from './auth';
import * as user from './user';
import * as tracks from './tracks';
import * as player from './player';
// import { store } from '../store';
// import { setAccessToken } from "store/user";

export const client = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateAuthHeader = (accessToken?: string) => {
  if (accessToken) {
    client.defaults.headers.Authorization = `Bearer ${accessToken}`;
  } else delete client.defaults.headers.Authorization;
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status !== 401) return Promise.reject(error);
    console.log('401:', error.respponse);
    
    // try {
    //   const refreshToken = store.getState().user.auth.refresh_token;
    //   const { access_token } = await auth.refreshAccessToken(refreshToken);
    //   store.dispatch(setAccessToken(access_token));

    //   error.config.headers['Authorization'] = `Bearer ${access_token}`;
    //   return axios.request(error.config);
    // } catch (err) {
      return Promise.reject(error);
    // }
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth,
  user,
  tracks,
  player
};