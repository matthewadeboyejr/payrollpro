import {
  EditEmployeeFormValues,
  EditUserFormValues,
} from "@/components/types/formFields";
import apiSlice from "../apiSlice";

import { LEAVEREQUEST } from "./constants";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveRequest: builder.query({
      query: ({ search, status }) => ({
        url: `${LEAVEREQUEST}?search=${search}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["Leave"],
    }),
    getLeaveRequestCalendar: builder.query({
      query: () => ({
        url: `${LEAVEREQUEST}/calendar`,
        method: "GET",
      }),
      providesTags: ["Leave"],
    }),
    getLeaveRequestSummary: builder.query({
      query: () => ({
        url: `${LEAVEREQUEST}/summary`,
        method: "GET",
      }),
      providesTags: ["Leave"],
    }),

    createLeaveRequest: builder.mutation({
      query: (employeeData) => ({
        url: `${LEAVEREQUEST}/create`,
        body: employeeData,
        method: "POST",
      }),
      invalidatesTags: ["Leave"],
    }),
    approveLeaveRequest: builder.mutation({
      query: ({ id }) => ({
        url: `${LEAVEREQUEST}/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Leave"],
    }),
    rejectLeaveRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `${LEAVEREQUEST}/reject/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Leave"],
    }),
    updateLeaveRequest: builder.mutation({
      query: ({
        employeeId,
        data,
      }: {
        employeeId: string;
        data: Partial<EditEmployeeFormValues>;
      }) => ({
        url: `${LEAVEREQUEST}/update/${employeeId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Leave"],
    }),
    getLeaveRequestById: builder.query({
      query: (id) => ({
        url: `${LEAVEREQUEST}/${id}`,
        method: "GET",
      }),
      providesTags: ["Leave"],
    }),
  }),
});

export const {
  useCreateLeaveRequestMutation,
  useGetLeaveRequestByIdQuery,
  useGetLeaveRequestQuery,
  useUpdateLeaveRequestMutation,
  useApproveLeaveRequestMutation,
  useRejectLeaveRequestMutation,
  useGetLeaveRequestSummaryQuery,
  useGetLeaveRequestCalendarQuery,
} = leaveApiSlice;
