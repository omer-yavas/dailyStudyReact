import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FileApi = createApi({
  reducerPath: "FileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }),
  endpoints: (builder) => ({
    fetchFiles: builder.query({
      query: () => "api/admin/File/ReadBySieveModel",
    }),
    postFile: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuItem/Create",
        method: "POST",
        body: newData,
      }),
    }),
  }),
});

export const { useFetchFilesQuery, usePostFileMutation } = FileApi;
