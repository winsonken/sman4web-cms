import { sman4webApi } from './sman4webApi';

export const pelanggaranApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getPelanggaran: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/pelanggaran?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Pelanggaran'],
    }),
    getPelanggaranBySiswa: builder.query({
      query: ({ siswa, page, limit }) =>
        `/api/v1/pelanggaran?siswa=${siswa}&page=${page}&limit=${limit}`,
      providesTags: ['Pelanggaran'],
    }),
    createPelanggaran: builder.mutation({
      query: (body) => ({
        url: '/api/v1/pelanggaran',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Pelanggaran'],
    }),
    updatePelanggaran: builder.mutation({
      query: (body) => ({
        url: '/api/v1/pelanggaran',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Pelanggaran'],
    }),
    deletePelanggaran: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/pelanggaran/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pelanggaran'],
    }),
  }),
});

export const {
  useGetPelanggaranQuery,
  useGetPelanggaranBySiswaQuery,
  useCreatePelanggaranMutation,
  useUpdatePelanggaranMutation,
  useDeletePelanggaranMutation,
} = pelanggaranApiSlice;
