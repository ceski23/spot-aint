import { client } from "api";

export const getUserSavedTracks = async ({ limit = 20, offset = 0 }) => (
  client.get('me/tracks', { params: { limit, offset } }).then(res => res.data)
)
