import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.55:8085/api/' }),
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => `admin/Menu/ReadBySieveModel`,
    }),
  }),
});

export const { useGetAllMenuItemsQuery } = menuApi;
