import { sman4webApi } from './sman4webApi';

export const tahunAjaran = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getTahunAjaran: builder.query({
      query: ({ page, limit }) =>
        `/api/v1/tahun-ajaran?page=${page}&limit=${limit}`,
      providesTags: ['Tahun ajaran'],
    }),

    getTahunAjaranBerakhir: builder.query({
      query: ({ page, limit }) =>
        `/api/v1/tahun-ajaran?status=2&page=${page}&limit=${limit}`,
      providesTags: ['Tahun ajaran'],
    }),
  }),
});

export const { useGetTahunAjaranQuery, useGetTahunAjaranBerakhirQuery } =
  tahunAjaran;
