// authApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    employeeLogin: builder.mutation({
      query: (credentials) => ({
        url: "/employee/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useEmployeeLoginMutation, useLogoutMutation } = authApiSlice;
