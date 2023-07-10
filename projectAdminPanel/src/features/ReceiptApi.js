import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReceiptApi = createApi({
  reducerPath: "ReceiptApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }),
  endpoints: (builder) => ({
    fetchReceipts: builder.query({
      query: () => "api/admin/Receipt/ReadBySieveModel",
      providesTags: ["Receipt"],
    }),
    postReceipt: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Receipt/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Receipt"],
    }),
    updateReceipt: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `api/admin/Receipt/Update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Receipt"],
    }),
    deleteReceipt: builder.mutation({
      query: (newData) => ({
        url: `api/admin/Receipt/Delete`,
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["Receipt"],
    }),
  }),
});

export const {
  useFetchReceiptsQuery,
  usePostReceiptMutation,
  useUpdateReceiptMutation,
  useDeleteReceiptMutation,
} = ReceiptApi;
