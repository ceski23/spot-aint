import axios from "axios";
import * as auth from './auth';
import * as user from './user';
import * as tracks from './tracks';
import * as player from './player';
import * as playlists from './playlists';
import * as search from './search';
import { store } from '../store';
import { setAccessToken } from "store/user";

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
    if (error.response && error.response.status === 401) {
      store.dispatch(setAccessToken(''));
    }
    else if (error.response && error.response.status === 403) {
      alert('Ta funkcja jest dostępna tylko dla użytkowników z kontem premium');
    }
    
    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth,
  user,
  tracks,
  player,
  playlists,
  search
};