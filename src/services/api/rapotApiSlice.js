import { sman4webApi } from './sman4webApi';

export const rapotApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getRapot: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/rapot-siswa?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Rapot'],
    }),
    getRapotBySiswa: builder.query({
      query: ({ siswa, page, limit }) =>
        `/api/v1/rapot-siswa?siswa=${siswa}&page=${page}&limit=${limit}`,
      providesTags: ['Rapot'],
    }),
  }),
});

export const { useGetRapotQuery, useGetRapotBySiswaQuery } = rapotApiSlice;
