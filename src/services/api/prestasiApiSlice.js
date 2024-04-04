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
    createPrestasi: builder.mutation({
      query: (body) => ({
        url: '/api/v1/prestasi',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Prestasi'],
    }),
    updatePrestasi: builder.mutation({
      query: (body) => ({
        url: '/api/v1/prestasi',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Prestasi'],
    }),
    deletePrestasi: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/prestasi/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Prestasi'],
    }),
  }),
});

export const {
  useGetPrestasiQuery,
  useGetPrestasiBySiswaQuery,
  useCreatePrestasiMutation,
  useUpdatePrestasiMutation,
  useDeletePrestasiMutation,
} = prestasiApiSlice;
