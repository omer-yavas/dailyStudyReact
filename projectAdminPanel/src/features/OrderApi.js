import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }),
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: () => "api/admin/Order/ReadBySieveModel",
      providesTags: ["Orders"],
    }),
    postOrder: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Order/Create",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (newData) => ({
        url: "api/admin/Order/Delete",
        method: "DELETE",
        body: newData,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useFetchOrdersQuery,
  usePostOrderMutation,
  useDeleteOrderMutation,
} = OrderApi;
