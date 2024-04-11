import { sman4webApi } from './sman4webApi';

export const guruApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuru: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/guru?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Guru'],
    }),
    createGuru: builder.mutation({
      query: (body) => ({
        url: '/api/v1/guru',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Guru'],
    }),
    updateGuru: builder.mutation({
      query: (body) => ({
        url: '/api/v1/guru',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Guru'],
    }),
    deleteGuru: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/guru/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Guru'],
    }),
  }),
});

export const {
  useGetGuruQuery,
  useCreateGuruMutation,
  useUpdateGuruMutation,
  useDeleteGuruMutation,
} = guruApiSlice;
