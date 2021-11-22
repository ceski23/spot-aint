import { client } from "api";

export const transferPlayback = async ({ deviceId }) => (
  client.put('me/player', {
    device_ids: [deviceId],
    play: false
  }).then(res => res.data)
)

export const startPlayback = async ({ uris, offset }) => (
  client.put('me/player/play', {
    uris, offset
  }).then(res => res.data).catch(() => {})
)

export const playPlaylist = async ({ uri, offset }) => (
  client.put('me/player/play', { context_uri: uri, offset }).then(res => res.data).catch(() => {})
)