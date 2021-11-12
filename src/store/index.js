import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist";
import userReducer from 'store/user';
import playerReducer from 'store/player';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
        ]
      }
    })
  )
});

export const persistor = persistStore(store);