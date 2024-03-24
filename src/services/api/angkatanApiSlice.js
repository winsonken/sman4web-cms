import { sman4webApi } from './sman4webApi';

export const angkatanApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getAngkatan: builder.query({
      query: ({ no, q, page, limit }) =>
        `/api/v1/angkatan?no=${no}&q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Angkatan'],
    }),
    getAngkatanOption: builder.query({
      query: () => `/api/v1/angkatan?limit=1000`,
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
    updateMulaiAngkatan: builder.mutation({
      query: (body) => ({
        url: `/api/v1/angkatan/mulai-angkatan`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Angkatan'],
    }),
    updateLulusAngkatan: builder.mutation({
      query: (body) => ({
        url: `/api/v1/angkatan/lulus-angkatan`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Angkatan'],
    }),
  }),
});

export const {
  useGetAngkatanQuery,
  useGetAngkatanOptionQuery,
  useCreateAngkatanMutation,
  useUpdateAngkatanMutation,
  useDeleteAngkatanMutation,
  useUpdateLulusAngkatanMutation,
  useUpdateMulaiAngkatanMutation,
} = angkatanApiSlice;
