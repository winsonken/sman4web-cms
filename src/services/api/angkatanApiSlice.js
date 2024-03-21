import { sman4webApi } from './sman4webApi';

export const angkatanApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getAngkatan: builder.query({
      query: ({ page, limit }) =>
        `/api/v1/angkatan?page=${page}&limit=${limit}`,
      providesTags: ['Angkatan'],
    }),
    createAngkatan: builder.mutation({
      query: (body) => ({
        url: '/api/v1/angkatan',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Angkatan'],
    }),
    updateAngkatan: builder.mutation({
      query: (body) => ({
        url: '/api/v1/angkatan',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Angkatan'],
    }),
    deleteAngkatan: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/angkatan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Angkatan'],
    }),
  }),
});

export const {
  useGetAngkatanQuery,
  useCreateAngkatanMutation,
  useUpdateAngkatanMutation,
  useDeleteAngkatanMutation,
} = angkatanApiSlice;
