import {
  EditEmployeeFormValues,
  EditUserFormValues,
} from "@/components/types/formFields";
import apiSlice from "../apiSlice";

import {
  EMPLOYEES,
  EMPLOYMENT_TYPES,
  GRADE_LEVELS,
  SALARY_BANDS,
  WORK_SCHEDULE_TYPES,
} from "./constants";

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
    getEmploymentTypes: builder.query({
      query: () => ({
        url: `${EMPLOYMENT_TYPES}`,
        method: "GET",
      }),
    }),
    getSalaryBandsByGradeLevelId: builder.query({
      query: (gradeLevelId) => ({
        url: `${SALARY_BANDS}/gradeLevel/${gradeLevelId}`,
        method: "GET",
      }),
    }),
    getGradeLevels: builder.query({
      query: () => ({
        url: `${GRADE_LEVELS}`,
        method: "GET",
      }),
    }),
    getWorkScheduleTypes: builder.query({
      query: () => ({
        url: `${WORK_SCHEDULE_TYPES}`,
        method: "GET",
      }),
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
  useGetEmploymentTypesQuery,
  useLazyGetSalaryBandsByGradeLevelIdQuery,
  useGetSalaryBandsByGradeLevelIdQuery,
  useGetGradeLevelsQuery,
  useGetWorkScheduleTypesQuery,
} = employeeApiSlice;
