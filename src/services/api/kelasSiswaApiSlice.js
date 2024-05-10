import { sman4webApi } from './sman4webApi';

export const kelasSiswaApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getKelasSiswa: builder.query({
      query: ({ kelas, q, page, limit }) =>
        `/api/v1/kelas-siswa?kelas=${kelas}&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Kelas_siswa', 'Rapot'],
    }),
    getRiwayatKelasSiswa: builder.query({
      query: ({ siswa, page, limit }) =>
        `/api/v1/kelas-siswa?siswa=${siswa}&page=${page}&limit=${limit}`,
      providesTags: ['Kelas_siswa'],
    }),
    createKelasSiswa: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas-siswa',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Kelas_siswa', 'Rapot', 'Siswa'],
    }),
    updateKelasSiswa: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas-siswa',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Kelas_siswa'],
    }),
    deleteKelasSiswa: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/kelas-siswa/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Kelas_siswa', 'Rapot', 'Siswa'],
    }),
    updateNaikKelas: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas-siswa/naik-kelas',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Kelas_siswa'],
    }),
    updateTinggalKelas: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas-siswa/tinggal-kelas',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Kelas_siswa'],
    }),
    updateLulus: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas-siswa/lulus',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Kelas_siswa', 'Angkatan'],
    }),
    updateTidakLulus: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas-siswa/tidak-lulus',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Kelas_siswa'],
    }),
  }),
});

export const {
  useGetKelasSiswaQuery,
  useGetRiwayatKelasSiswaQuery,
  useCreateKelasSiswaMutation,
  useUpdateKelasSiswaMutation,
  useDeleteKelasSiswaMutation,
  useUpdateNaikKelasMutation,
  useUpdateTinggalKelasMutation,
  useUpdateLulusMutation,
  useUpdateTidakLulusMutation,
} = kelasSiswaApiSlice;
