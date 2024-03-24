import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sman4webApi = createApi({
  reducerPath: 'sman4webApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5500',
    prepareHeaders: (headers, { getState }) => {
      let token = getState().auth.token;

      if (token) {
        headers.set('auth-token', `${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ['Angkatan', 'Tahun ajaran', 'Role', 'Module'],
  endpoints: () => ({}),
});
