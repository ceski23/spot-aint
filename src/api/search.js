import { client } from "api";

export const searchSong = async ({ limit = 20, offset = 0, market = 'from_token', query }) => (
  client.get('search', {
    params: { limit, offset, market, q: query, type: 'track' }
  }).then(res => res.data.tracks)
);