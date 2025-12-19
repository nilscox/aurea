import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppState } from './store';

type App = {
  header: {
    title: string;
  };
};

const initialState: App = {
  header: {
    title: 'Aurea',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

const selectApp = (state: AppState) => state.app;

export const selectAppHeader = createSelector(selectApp, (app) => app.header);
