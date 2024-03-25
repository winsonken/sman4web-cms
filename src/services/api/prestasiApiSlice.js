import { sman4webApi } from './sman4webApi';

export const prestasiApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrestasi: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/prestasi?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Prestasi'],
    }),
    getPrestasiBySiswa: builder.query({
      query: ({ siswa, page, limit }) =>
        `/api/v1/prestasi?siswa=${siswa}&page=${page}&limit=${limit}`,
      providesTags: ['Prestasi'],
    }),
  }),
});

export const { useGetPrestasiQuery, useGetPrestasiBySiswaQuery } =
  prestasiApiSlice;
