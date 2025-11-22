import apiSlice from "../apiSlice";

import {
  LOGIN,
  NEW_USER,
  SET_PASSWORD,
  USERS,
  REFRESH_TOKEN,
} from "./constants";
import { EditUserFormValues } from "@/components/types/formFields";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: LOGIN,
        body: userData,
        method: "POST",
      }),
    }),
    // Login users route
    AddNewUser: builder.mutation({
      query: (userData) => ({
        url: NEW_USER,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `user/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deactivateUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({
        userId,
        data,
      }: {
        userId: string;
        data: Partial<EditUserFormValues>;
      }) => ({
        url: `user/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    setPassword: builder.mutation({
      query: (data) => ({
        url: SET_PASSWORD,
        body: data,
        method: "POST",
      }),
    }),
    setRefreshToken: builder.mutation({
      query: (data) => ({
        url: REFRESH_TOKEN,
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useSetPasswordMutation,
  useDeactivateUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useSetRefreshTokenMutation,
} = authApiSlice;
