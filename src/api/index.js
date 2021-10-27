import axios from "axios";
import * as auth from './auth';

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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth,
};