import apiSlice from "../apiSlice";
import { DEPARTMENTS, LEAVETYPE, POSITIONS, ROLES } from "./constants";

export const dataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
        url: `${ROLES}/list`,
        method: "GET",
      }),
    }),
    getDepartments: builder.query({
      query: () => ({
        url: DEPARTMENTS,
        method: "GET",
      }),
    }),
    getPositions: builder.query({
      query: () => ({
        url: POSITIONS,
        method: "GET",
      }),
    }),
    getLeaveType: builder.query({
      query: () => ({
        url: LEAVETYPE,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetDepartmentsQuery,
  useGetPositionsQuery,
  useGetLeaveTypeQuery,
} = dataApiSlice;
