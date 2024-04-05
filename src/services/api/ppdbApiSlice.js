import { sman4webApi } from './sman4webApi';

export const ppdbApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getPPDB: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/ppdb?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Ppdb'],
    }),
    createPPDB: builder.mutation({
      query: (body) => ({
        url: '/api/v1/ppdb',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ppdb'],
    }),
    updatePPDB: builder.mutation({
      query: (body) => ({
        url: '/api/v1/ppdb',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Ppdb'],
    }),
    deletePPDB: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/ppdb/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ppdb'],
    }),
    updateTerimaPpdb: builder.mutation({
      query: (body) => ({
        url: `/api/v1/ppdb/terima-ppdb`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ppdb'],
    }),
    updateTerimaSemuaPpdb: builder.mutation({
      query: (body) => ({
        url: `/api/v1/ppdb/terima-semua`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ppdb'],
    }),
    updateTolakPpdb: builder.mutation({
      query: (body) => ({
        url: `/api/v1/ppdb/tolak-ppdb`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ppdb'],
    }),
    updatePindahPpdb: builder.mutation({
      query: (body) => ({
        url: `/api/v1/ppdb/pindah-siswa`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ppdb'],
    }),
  }),
});

export const {
  useGetPPDBQuery,
  useCreatePPDBMutation,
  useUpdatePPDBMutation,
  useDeletePPDBMutation,
  useUpdateTerimaPpdbMutation,
  useUpdateTerimaSemuaPpdbMutation,
  useUpdateTolakPpdbMutation,
  useUpdatePindahPpdbMutation,
} = ppdbApiSlice;
