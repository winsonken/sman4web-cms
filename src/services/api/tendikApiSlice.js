import { sman4webApi } from './sman4webApi';

export const tendikApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getTendik: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/tendik?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Tendik'],
    }),
    createTendik: builder.mutation({
      query: (body) => ({
        url: '/api/v1/tendik',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tendik'],
    }),
    updateTendik: builder.mutation({
      query: (body) => ({
        url: '/api/v1/tendik',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Tendik'],
    }),
    deleteTendik: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/tendik/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tendik'],
    }),
  }),
});

export const {
  useGetTendikQuery,
  useCreateTendikMutation,
  useUpdateTendikMutation,
  useDeleteTendikMutation,
} = tendikApiSlice;
