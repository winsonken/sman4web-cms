import { sman4webApi } from './sman4webApi';

export const pelanggaranApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getPelanggaran: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/pelanggaran?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Pelanggaran'],
    }),
  }),
});

export const { useGetPelanggaranQuery } = pelanggaranApiSlice;
