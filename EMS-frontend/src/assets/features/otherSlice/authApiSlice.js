import { apiSlice } from "../api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.query({
      query: (credentials) => ({
        url: "/admin/login",
        method: "GET",
        body: credentials,
      }),
    }),
    employeeLogin: builder.query({
      query: (credentials) => ({
        url: "/employee/login",
        method: "GET",
        body: credentials,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/admin/logout",
        method: "get",
      }),
    }),
  }),
});

export const { useAdminLoginQuery, useEmployeeLoginQuery, useLogoutQuery } =
  authApiSlice;
