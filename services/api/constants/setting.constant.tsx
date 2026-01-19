import apiSlice from "../apiSlice";

import {
  LOGIN,
  NEW_USER,
  SET_PASSWORD,
  USERS,
  REFRESH_TOKEN,
  SALARY_BANDS,
} from "./constants";
import { EditSalaryBandFormValues } from "@/components/types/formFields";

export const settingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalaryBands: builder.query({
      query: () => ({
        url: SALARY_BANDS,
        method: "GET",
      }),
      providesTags: ["SalaryBand"],
    }),
    addNewSalaryBand: builder.mutation({
      query: (salaryBandData) => ({
        url: SALARY_BANDS,
        body: salaryBandData,
        method: "POST",
      }),
      invalidatesTags: ["SalaryBand"],
    }),
    getSalaryBandById: builder.query({
      query: (salaryBandId) => ({
        url: `${SALARY_BANDS}/${salaryBandId}`,
        method: "GET",
      }),
      providesTags: ["SalaryBand"],
    }),
    deactivateSalaryBand: builder.mutation({
      query: (salaryBandId) => ({
        url: `${SALARY_BANDS}/${salaryBandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SalaryBand"],
    }),
    updateSalaryBand: builder.mutation({
      query: ({
        salaryBandId,
        data,
      }: {
        salaryBandId: string;
        data: Partial<EditSalaryBandFormValues>;
      }) => ({
        url: `${SALARY_BANDS}/${salaryBandId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SalaryBand"],
    }),
  }),
});

export const {
  useGetSalaryBandsQuery,
  useAddNewSalaryBandMutation,
  useDeactivateSalaryBandMutation,
  useGetSalaryBandByIdQuery,
  useUpdateSalaryBandMutation,
} = settingApiSlice;
