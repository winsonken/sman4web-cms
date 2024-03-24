import { sman4webApi } from './sman4webApi';

export const moduleApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getModule: builder.query({
      query: ({ role }) => `/api/v1/modul-user?role=${role}`,
      providesTags: ['Module'],
    }),
    updateModule: builder.mutation({
      query: (body) => ({
        url: '/api/v1/modul-user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Module'],
    }),
  }),
});

export const { useGetModuleQuery, useUpdateModuleMutation } = moduleApiSlice;
