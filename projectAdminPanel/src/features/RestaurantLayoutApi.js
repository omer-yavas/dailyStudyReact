import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RestaurantLayoutApi = createApi({
  reducerPath: "RestaurantLayoutApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }), // API base URL'sini belirtin
  tagTypes: ["Layout"],
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () =>
        "api/admin/Section/ReadBySieveModel?Filters=isDeleted%3D%3Dfalse",
      providesTags: ["Layout"], // API'deki veriyi almak için uygun bir endpoint belirtin
    }),
    postData: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Section/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Layout"],
    }),
    deleteData: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Section/Delete",
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["Layout"],
    }),
    editData: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `api/admin/Section/Update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Layout"],
    }),
    fetchTables: builder.query({
      query: () => "api/admin/Table/ReadBySieveModel",
      providesTags: ["Tables"], // API'deki veriyi almak için uygun bir endpoint belirtin
    }),
  }),
});

export const {
  useFetchDataQuery,
  useFetchTablesQuery,
  usePostDataMutation,
  useDeleteDataMutation,
  useEditDataMutation,
} = RestaurantLayoutApi;
