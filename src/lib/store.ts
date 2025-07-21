import { configureStore } from '@reduxjs/toolkit';
import nameReducer from './features/name/nameSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      name: nameReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];