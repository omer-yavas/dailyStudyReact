import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }),
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "api/admin/User/ReadBySieveModel",
      providesTags: ["Customer"],
    }),
    postUser: builder.mutation({
      query: (newData) => ({
        url: "api/admin/User/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const { useFetchUsersQuery, usePostUserMutation } = UserApi;
