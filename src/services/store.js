import { configureStore } from '@reduxjs/toolkit';
import { sman4webApi } from './api/sman4webApi';

export const store = configureStore({
  reducer: {
    [sman4webApi.reducerPath]: sman4webApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sman4webApi.middleware),
});
