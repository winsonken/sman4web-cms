import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sman4webApi = createApi({
  reducerPath: 'sman4webApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500' }),
  tagTypes: ['Angkatan'],
  endpoints: () => ({}),
});
