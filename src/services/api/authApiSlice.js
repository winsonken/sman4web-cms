import { sman4webApi } from './sman4webApi';

export const authApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/api/v1/login`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
