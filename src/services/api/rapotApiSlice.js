import { sman4webApi } from './sman4webApi';

export const rapotApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getRapot: builder.query({
      query: ({ q, page, limit }) =>
        `/api/v1/rapot-siswa?q=${q}&page=${page}&limit=${limit}`,
      providesTags: ['Rapot'],
    }),
  }),
});

export const { useGetRapotQuery } = rapotApiSlice;
