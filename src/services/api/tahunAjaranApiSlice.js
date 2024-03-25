import { sman4webApi } from './sman4webApi';

export const tahunAjaran = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getTahunAjaran: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/tahun-ajaran?status=0,1&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Tahun ajaran'],
    }),

    getTahunAjaranBerakhir: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/tahun-ajaran?status=2&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Tahun ajaran'],
    }),
    createTahunAjaran: builder.mutation({
      query: (body) => ({
        url: '/api/v1/tahun-ajaran',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tahun ajaran'],
    }),
    updateTahunAjaran: builder.mutation({
      query: (body) => ({
        url: '/api/v1/tahun-ajaran',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Tahun ajaran'],
    }),
    deleteTahunAjaran: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/tahun-ajaran/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tahun ajaran'],
    }),
    updateMulaiAjaran: builder.mutation({
      query: (body) => ({
        url: `/api/v1/tahun-ajaran/mulai-ajaran`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Tahun ajaran'],
    }),
    updateSelesaiAjaran: builder.mutation({
      query: (body) => ({
        url: `/api/v1/tahun-ajaran/selesai-ajaran`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Tahun ajaran'],
    }),
  }),
});

export const {
  useGetTahunAjaranQuery,
  useGetTahunAjaranBerakhirQuery,
  useCreateTahunAjaranMutation,
  useUpdateTahunAjaranMutation,
  useDeleteTahunAjaranMutation,
  useUpdateMulaiAjaranMutation,
  useUpdateSelesaiAjaranMutation,
} = tahunAjaran;
