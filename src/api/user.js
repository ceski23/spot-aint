import { client } from "api";

export const getMe = async () => (
  client.get('me').then(res => res.data)
);