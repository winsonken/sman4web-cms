import { sman4webApi } from './sman4webApi';

export const profileApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileSiswa: builder.query({
      query: ({ siswa }) => `/api/v1/profile-siswa?siswa=${siswa}`,
      providesTags: ['Profile'],
    }),
    getProfileGuru: builder.query({
      query: ({ guru }) => `/api/v1/profile-guru?guru=${guru}`,
      providesTags: ['Profile'],
    }),
    getProfileTendik: builder.query({
      query: ({ tendik }) => `/api/v1/profile-tendik?tendik=${tendik}`,
      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileSiswaQuery,
  useGetProfileGuruQuery,
  useGetProfileTendikQuery,
} = profileApiSlice;
