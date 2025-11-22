import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../queryBuilder/customQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Employee", "Leave"],
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 60,
});

export default apiSlice;
