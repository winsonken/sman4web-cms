import { sman4webApi } from './sman4webApi';

export const rapotApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getRapot: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/rapot-siswa?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Rapot'],
    }),
    getRapotBySiswa: builder.query({
      query: ({ siswa, page, limit }) =>
        `/api/v1/rapot-siswa?siswa=${siswa}&page=${page}&limit=${limit}`,
      providesTags: ['Rapot'],
    }),
    updateRapotGanjilAwal: builder.mutation({
      query: (body) => ({
        url: '/api/v1/rapot-siswa/upload-ganjil-awal',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Rapot'],
    }),
    updateRapotGanjilAkhir: builder.mutation({
      query: (body) => ({
        url: '/api/v1/rapot-siswa/upload-ganjil-akhir',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Rapot'],
    }),
    updateRapotGenapAwal: builder.mutation({
      query: (body) => ({
        url: '/api/v1/rapot-siswa/upload-genap-awal',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Rapot'],
    }),
    updateRapotGenapAkhir: builder.mutation({
      query: (body) => ({
        url: '/api/v1/rapot-siswa/upload-genap-akhir',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Rapot'],
    }),
  }),
});

export const {
  useGetRapotQuery,
  useGetRapotBySiswaQuery,
  useUpdateRapotGanjilAwalMutation,
  useUpdateRapotGanjilAkhirMutation,
  useUpdateRapotGenapAwalMutation,
  useUpdateRapotGenapAkhirMutation,
} = rapotApiSlice;
