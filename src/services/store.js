import { configureStore } from '@reduxjs/toolkit';
import { sman4webApi } from './api/sman4webApi';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    [sman4webApi.reducerPath]: sman4webApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sman4webApi.middleware),
});
