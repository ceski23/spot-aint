import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    duration: 0,
    paused: true,
    position: 0,
    current_track: undefined,
    timestamp: 0,
    source: undefined,
    disallows: {}
  },
  volume: 0.5
}

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlaybackState: (state, { payload }) => {
      if (payload.timestamp > state.state.timestamp) {
        if (payload.duration !== undefined) state.state.duration = payload.duration;
        state.state.paused = payload.paused;
        if (payload.position !== undefined) state.state.position = payload.position;
        state.state.current_track = payload.track_window.current_track;
        state.state.timestamp = payload.timestamp;
        state.state.disallows = payload.disallows;
      }
    },
    setVolume: (state, { payload }) => {
      state.volume = payload;
    }
  }
});

export const {
  setPlaybackState,
  setVolume
} = slice.actions;

export default slice.reducer;

export const selectPlaybackState = (state) => state.player.state;
export const selectPlaybackVolume = (state) => state.player.volume;