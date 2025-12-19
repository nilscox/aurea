import { configureStore } from '@reduxjs/toolkit';

import { appSlice } from './app.slice';
import { serializeMiddleware } from './serialize';
import { sessionSlice } from './session.slice';

const serifyMiddleware = serializeMiddleware;

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(serifyMiddleware);
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
