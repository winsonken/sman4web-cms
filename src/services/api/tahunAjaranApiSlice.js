import { sman4webApi } from './sman4webApi';

export const tahunAjaran = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getTahunAjaran: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/tahun-ajaran?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Tahun ajaran'],
    }),
    getTahunAjaranAktif: builder.query({
      query: () => `/api/v1/tahun-ajaran/aktif`,
      providesTags: ['Tahun ajaran'],
    }),
    getTahunAjaranBerakhir: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/tahun-ajaran/berakhir?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Tahun ajaran'],
    }),
    getTahunAjaranBelumMulaiOption: builder.query({
      query: () => `/api/v1/tahun-ajaran?status=0&limit=1000`,
      providesTags: ['Tahun ajaran'],
    }),
    getAllTahunAjaranOption: builder.query({
      query: () => `/api/v1/tahun-ajaran/semua?limit=1000`,
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
  useGetTahunAjaranAktifQuery,
  useGetTahunAjaranBerakhirQuery,
  useGetTahunAjaranBelumMulaiOptionQuery,
  useGetAllTahunAjaranOptionQuery,
  useCreateTahunAjaranMutation,
  useUpdateTahunAjaranMutation,
  useDeleteTahunAjaranMutation,
  useUpdateMulaiAjaranMutation,
  useUpdateSelesaiAjaranMutation,
} = tahunAjaran;
