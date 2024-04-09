import { sman4webApi } from './sman4webApi';

export const jurusanApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getJurusan: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/jurusan?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Jurusan'],
    }),
    getJurusanOption: builder.query({
      query: () => `/api/v1/jurusan?limit=1000`,
      providesTags: ['Jurusan'],
    }),
    createJurusan: builder.mutation({
      query: (body) => ({
        url: '/api/v1/jurusan',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Jurusan'],
    }),
    updateJurusan: builder.mutation({
      query: (body) => ({
        url: '/api/v1/jurusan',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Jurusan'],
    }),
    deleteJurusan: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/jurusan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Jurusan'],
    }),
  }),
});

export const {
  useGetJurusanQuery,
  useGetJurusanOptionQuery,
  useCreateJurusanMutation,
  useUpdateJurusanMutation,
  useDeleteJurusanMutation,
} = jurusanApiSlice;
