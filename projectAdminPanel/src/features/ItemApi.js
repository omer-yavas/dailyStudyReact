import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ItemApi = createApi({
  reducerPath: "ItemApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }), // API base URL'sini belirtin
  endpoints: (builder) => ({
    fetchItems: builder.query({
      query: () =>
        "api/admin/MenuItem/ReadBySieveModel?Filters=isDeleted%3D%3Dfalse", // API'deki veriyi almak için uygun bir endpoint belirtin
      providesTags: ["Items"],
    }),
    postItem: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuItem/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuItem/Delete",
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["Items"],
    }),
    editItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `api/admin/MenuItem/Update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Items"],
    }),
    fetchItemCategories: builder.query({
      query: () =>
        "http://194.62.40.78/api/admin/MenuItemCategory/ReadBySieveModel?Filters=isDeleted%3D%3Dfalse",
      providesTags: ["ItemCategories"], // API'deki veriyi almak için uygun bir endpoint belirtin
    }),
    postItemCategory: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuItemCategory/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["ItemCategories"],
    }),
    deleteItemCategory: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuItemCategory/Delete",
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["ItemCategories"],
    }),
    editItemCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `api/admin/MenuItemCategory/Update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["ItemCategories"],
    }),
    fetchItemCountries: builder.query({
      query: () =>
        "http://192.168.1.55:8085/api/admin/Country/ReadBySieveModel",
    }),
  }),
});

export const {
  useFetchItemsQuery,
  usePostItemMutation,
  useDeleteItemMutation,
  useEditItemMutation,
  useFetchItemCategoriesQuery,
  usePostItemCategoryMutation,
  useDeleteItemCategoryMutation,
  useEditItemCategoryMutation,
  useFetchItemCountriesQuery,
} = ItemApi;
