import { sman4webApi } from './sman4webApi';

export const kelasApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getKelas: builder.query({
      query: ({ tahunAjaran, kelas, q, page, limit }) =>
        `/api/v1/kelas?tahunAjaran=${tahunAjaran}&kelas=${kelas}&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Kelas'],
    }),
    createKelas: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Kelas'],
    }),
    updateKelas: builder.mutation({
      query: (body) => ({
        url: '/api/v1/kelas',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Kelas'],
    }),
    deleteKelas: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/kelas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Kelas'],
    }),
    getKelasOption: builder.query({
      query: ({ tahunAjaran, kelas }) =>
        `/api/v1/kelas?tahunAjaran=${tahunAjaran}&kelas=${kelas}&limit=3000`,
      providesTags: ['Kelas'],
    }),
    getNaikKelasOption: builder.query({
      query: ({ tahunAjaran, kelas, jurusan }) =>
        `/api/v1/kelas?tahunAjaran=${tahunAjaran}&kelas=${kelas}&jurusan=${jurusan}&limit=3000`,
      providesTags: ['Kelas'],
    }),
  }),
});

export const {
  useGetKelasQuery,
  useCreateKelasMutation,
  useUpdateKelasMutation,
  useDeleteKelasMutation,
  useGetKelasOptionQuery,
  useGetNaikKelasOptionQuery,
} = kelasApiSlice;
