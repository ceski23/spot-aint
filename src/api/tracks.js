import { client } from "api";

export const getUserSavedTracks = async ({ limit = 20, offset = 0 }) => (
  client.get('me/tracks', { params: { limit, offset } }).then(res => res.data)
)

export const saveTracks = async ({ ids }) => (
  client.put('me/tracks', ids).then(res => res.data)
)

export const unsaveTracks = async ({ ids }) => (
  client.delete('me/tracks', { params: { ids: ids.join(',') } }).then(res => res.data)
)

export const checkIfSaved = async ({ ids }) => (
  client.get('me/tracks/contains', { params: { ids: ids.join(',') } }).then(res => res.data)
)