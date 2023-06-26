import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReceiptApi = createApi({
  reducerPath: "ReceiptApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.62.40.78/" }),
  endpoints: (builder) => ({
    fetchReceipts: builder.query({
      query: () => "api/admin/Receipt/ReadBySieveModel",
    }),
  }),
});

export const { useFetchReceiptsQuery } = ReceiptApi;
