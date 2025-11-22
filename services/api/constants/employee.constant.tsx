import {
  EditEmployeeFormValues,
  EditUserFormValues,
} from "@/components/types/formFields";
import apiSlice from "../apiSlice";

import { EMPLOYEES } from "./constants";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (search) => ({
        url: `${EMPLOYEES}?search=${search}`,
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),
    getEmployeesSummary: builder.query({
      query: () => ({
        url: `${EMPLOYEES}/stats`,
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),
    addNewEmployee: builder.mutation({
      query: (employeeData) => ({
        url: `${EMPLOYEES}/create`,
        body: employeeData,
        method: "POST",
      }),
      invalidatesTags: ["Employee"],
    }),
    deactivateemployee: builder.mutation({
      query: (employeeId) => ({
        url: `${EMPLOYEES}/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({
        employeeId,
        data,
      }: {
        employeeId: string;
        data: Partial<EditEmployeeFormValues>;
      }) => ({
        url: `${EMPLOYEES}/${employeeId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployeeById: builder.query({
      query: (employeeId) => ({
        url: `${EMPLOYEES}/${employeeId}`,
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddNewEmployeeMutation,
  useDeactivateemployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useGetEmployeesSummaryQuery,
} = employeeApiSlice;
