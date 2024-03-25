import { sman4webApi } from './sman4webApi';

export const siswaApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiswa: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/siswa?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Siswa'],
    }),
    getSiswaOption: builder.query({
      query: () => `/api/v1/siswa?limit=3000`,
      providesTags: ['Siswa'],
    }),
  }),
});

export const { useGetSiswaQuery, useGetSiswaOptionQuery } = siswaApiSlice;
