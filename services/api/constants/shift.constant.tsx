import apiSlice from "../apiSlice";
import { ROTA, SHIFTS } from "./constants";

export const shiftApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShifts: builder.query({
      query: ({ departmentId }) => ({
        url: `${SHIFTS}?departmentId=${departmentId}`,
        method: "GET",
      }),
      providesTags: ["Shifts"],
    }),
    getShiftById: builder.query({
      query: (shiftId) => ({
        url: `${SHIFTS}/${shiftId}`,
        method: "GET",
      }),
      providesTags: ["Shifts"],
    }),
    createShift: builder.mutation({
      query: (shiftData) => ({
        url: `${SHIFTS}`,
        body: shiftData,
        method: "POST",
      }),
      invalidatesTags: ["Shifts"],
    }),
    editShift: builder.mutation({
      query: ({ payload, shiftId }) => ({
        url: `${SHIFTS}/${shiftId}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["Shifts"],
    }),
    deleteShift: builder.mutation({
      query: (shiftId) => ({
        url: `${SHIFTS}/${shiftId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shifts"],
    }),
    getRota: builder.query({
      query: (rotaFilters) => ({
        url: `${ROTA}/monthly?departmentId=${rotaFilters.departmentId}&month=${rotaFilters.month}&year=${rotaFilters.year}&search=${rotaFilters.search}`,
        method: "GET",
      }),
      providesTags: ["Rota"],
    }),
    getRotaSummary: builder.query({
      query: (rotaFilters) => ({
        url: `${ROTA}/rota-summary?departmentId=${rotaFilters.departmentId}&month=${rotaFilters.month}&year=${rotaFilters.year}`,
        method: "GET",
      }),
      providesTags: ["Rota"],
    }),
    getRotaById: builder.query({
      query: (rotaId) => ({
        url: `${ROTA}/${rotaId}`,
        method: "GET",
      }),
      providesTags: ["Rota"],
    }),
    createRota: builder.mutation({
      query: (rotaData) => ({
        url: `${ROTA}`,
        body: rotaData,
        method: "POST",
      }),
      invalidatesTags: ["Rota"],
    }),
    editRota: builder.mutation({
      query: ({ payload, rotaId }) => ({
        url: `${ROTA}/${rotaId}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["Rota"],
    }),
    completeRota: builder.mutation({
      query: (rotaData) => ({
        url: `${ROTA}/complete`,
        body: rotaData,
        method: "POST",
      }),
      invalidatesTags: ["Rota"],
    }),
    claimRota: builder.mutation({
      query: (rotaData) => ({
        url: `${ROTA}/claim`,
        body: rotaData,
        method: "POST",
      }),
      invalidatesTags: ["Rota"],
    }),
    cancelRota: builder.mutation({
      query: ({ rotaData, rotaId }) => ({
        url: `${ROTA}/${rotaId}/cancel`,
        body: rotaData,
        method: "PUT",
      }),
      invalidatesTags: ["Rota"],
    }),
    deleteRota: builder.mutation({
      query: (rotaId) => ({
        url: `${ROTA}/${rotaId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rota"],
    }),
  }),
});

export const {
  useGetShiftsQuery,
  useCreateShiftMutation,
  useGetRotaQuery,
  useCreateRotaMutation,
  useGetRotaByIdQuery,
  useCompleteRotaMutation,
  useClaimRotaMutation,
  useCancelRotaMutation,
  useDeleteRotaMutation,
  useEditRotaMutation,
  useGetShiftByIdQuery,
  useEditShiftMutation,
  useDeleteShiftMutation,
  useGetRotaSummaryQuery,
} = shiftApiSlice;
