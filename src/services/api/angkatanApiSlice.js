import { sman4webApi } from './sman4webApi';

export const angkatanApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getAngkatan: builder.query({
      query: () => `/api/v1/angkatan`,
      providesTags: ['Angkatan'],
    }),
  }),
});

export const { useGetAngkatanQuery } = angkatanApiSlice;
