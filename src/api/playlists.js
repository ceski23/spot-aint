import { client } from "api";

export const getUserPlaylists = async ({ limit = 20, offset = 0 }) => (
  client.get('me/playlists', { params: { limit, offset } }).then(res => res.data)
);

export const getPlaylist = async ({ id }) => (
  client.get(`playlists/${id}`).then(res => res.data)
);

export const getPlaylistTracks = async ({ id, limit = 20, offset = 0 }) => (
  client.get(`playlists/${id}/tracks`, { params: { limit, offset } }).then(res => res.data)
);