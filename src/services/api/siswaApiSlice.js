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
      invalidatesTags: ['Siswa', 'Angkatan'],
    }),
    updateSiswa: builder.mutation({
      query: (body) => ({
        url: '/api/v1/siswa',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Siswa', 'Angkatan'],
    }),
    deleteSiswa: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/siswa/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Siswa', 'Angkatan'],
    }),
    updateAktifSiswa: builder.mutation({
      query: (body) => ({
        url: `/api/v1/siswa/set-aktif`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Siswa'],
    }),
    updateSetJurusan: builder.mutation({
      query: (body) => ({
        url: `/api/v1/siswa/set-jurusan`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Siswa', 'Profile', 'Kelas', 'Kelas_siswa'],
    }),
    updateSetAlumni: builder.mutation({
      query: (body) => ({
        url: `/api/v1/siswa/set-alumni`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Siswa'],
    }),
    getSiswaLulus: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/siswa/lulus?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Siswa'],
    }),
    getAlumni: builder.query({
      query: ({ angkatan, q, page, limit }) =>
        `/api/v1/siswa/alumni?angkatan=${angkatan}&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Siswa'],
    }),
    getSiswaBelumAdaKelasOption: builder.query({
      query: () => `/api/v1/siswa/belum-ada-kelas?limit=3000`,
      providesTags: ['Siswa'],
    }),
    getJumlahSiswaAktif: builder.query({
      query: () => `/api/v1/siswa/jumlah-siswa-aktif`,
      providesTags: ['Siswa'],
    }),
    getJumlahAlumni: builder.query({
      query: () => `/api/v1/siswa/jumlah-alumni`,
      providesTags: ['Siswa'],
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
  useUpdateSetJurusanMutation,
  useUpdateSetAlumniMutation,
  useGetSiswaLulusQuery,
  useGetAlumniQuery,
  useGetSiswaBelumAdaKelasOptionQuery,
  useGetJumlahSiswaAktifQuery,
  useGetJumlahAlumniQuery,
} = siswaApiSlice;
