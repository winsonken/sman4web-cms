import { sman4webApi } from './sman4webApi';

export const siswaApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiswa: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/siswa?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Siswa'],
    }),
    getSiswaAktif: builder.query({
      query: ({ angkatan, q, page, limit }) =>
        `/api/v1/siswa?status=1&angkatan=${angkatan}&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Siswa'],
    }),
    getSiswaBaru: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/siswa/baru?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Siswa'],
    }),
    getSiswaOption: builder.query({
      query: () => `/api/v1/siswa?limit=3000`,
      providesTags: ['Siswa'],
    }),
    createSiswa: builder.mutation({
      query: (body) => ({
        url: '/api/v1/siswa',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Siswa'],
    }),
    updateSiswa: builder.mutation({
      query: (body) => ({
        url: '/api/v1/siswa',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Siswa'],
    }),
    deleteSiswa: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/siswa/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Siswa'],
    }),
    updateAktifSiswa: builder.mutation({
      query: (body) => ({
        url: `/api/v1/siswa/set-aktif`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Siswa'],
    }),
  }),
});

export const {
  useGetSiswaQuery,
  useGetSiswaAktifQuery,
  useGetSiswaBaruQuery,
  useGetSiswaOptionQuery,
  useCreateSiswaMutation,
  useUpdateSiswaMutation,
  useDeleteSiswaMutation,
  useUpdateAktifSiswaMutation,
} = siswaApiSlice;
