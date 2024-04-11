import { sman4webApi } from './sman4webApi';

export const roleApiSlice = sman4webApi.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query({
      query: ({ search, page, limit }) =>
        `/api/v1/role?q=${search}&page=${page}&limit=${limit}`,
      providesTags: ['Role'],
    }),

    getRoleOption: builder.query({
      query: () => `/api/v1/role?limit=1000`,
      providesTags: ['Role'],
    }),
  }),
});

export const { useGetRoleQuery, useGetRoleOptionQuery } = roleApiSlice;
