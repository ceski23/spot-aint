import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  auth: {
    access_token: undefined,
    refresh_token: undefined,
  },
  }
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.auth.access_token = payload;
    },
    setAuthData: (state, { payload }) => {
      state.auth.access_token = payload.access_token;
      state.auth.refresh_token = payload.refresh_token;
    },
    logout: (state) => {
      state.auth.access_token = undefined;
      state.auth.refresh_token = undefined;
      state.info = undefined;
    }
  }
});

export const {
  setAccessToken,
  setAuthData,
  logout
} = slice.actions;

export default persistReducer({
  key: 'user',
  storage: storage
}, slice.reducer);

export const selectAccessToken = (state) => state.user.auth.access_token;
