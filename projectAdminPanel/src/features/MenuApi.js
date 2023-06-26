import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MenuApi = createApi({
  reducerPath: "MenuApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }), // API base URL'sini belirtin
  endpoints: (builder) => ({
    fetchAllMenu: builder.query({
      query: () =>
        "api/admin/Menu/ReadBySieveModel?Filters=isDeleted%3D%3Dfalse", // API'deki veriyi almak için uygun bir endpoint belirtin
      providesTags: ["AllMenu"],
    }),
    postMenu: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Menu/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["AllMenu"],
    }),
    deleteMenu: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Menu/Delete",
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["AllMenu"],
    }),
    editMenu: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `api/admin/Menu/Update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["AllMenu"],
    }),
    fetchMenuCategories: builder.query({
      query: () =>
        "api/admin/MenuCategory/ReadBySieveModel?Filters=isDeleted%3D%3Dfalse",
      providesTags: ["MenuCategories"], // API'deki veriyi almak için uygun bir endpoint belirtin
    }),
    postMenuCategory: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuCategory/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["MenuCategories"],
    }),
    deleteMenuCategory: builder.mutation({
      query: (newData) => ({
        url: "api/admin/MenuCategory/Delete",
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["MenuCategories"],
    }),
    editMenuCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `api/admin/MenuCategory/Update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["MenuCategories"],
    }),
  }),
});

export const {
  useFetchAllMenuQuery,
  usePostMenuMutation,
  useDeleteMenuMutation,
  useEditMenuMutation,
  useFetchMenuCategoriesQuery,
  usePostMenuCategoryMutation,
  useDeleteMenuCategoryMutation,
  useEditMenuCategoryMutation,
} = MenuApi;
