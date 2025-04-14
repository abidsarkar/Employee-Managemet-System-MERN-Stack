import { apiSlice } from "../api/apiSlice";
export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeInfo: builder.query({
      query: (pageInfo) => ({
        url: "/employee/employeeInfo",
        method: "GET",
        body: pageInfo,
        credentials: "include",
      }),
    }),
    getEmployeeTask: builder.query({
      query: (employeeEmail) => ({
        url: `/employee/getTask?email=${employeeEmail}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    updateTaskByEmployee: builder.mutation({
      query: (updatedData) => ({
        url: "/employee/updateTaskEmployee",
        method: "PATCH",
        body: updatedData,
        credentials: "include",
      }),
    }),

    submitTask: builder.mutation({
      query: (updatedData) => ({
        url: "/employee/submitTask",
        method: "PATCH",
        body: updatedData,
        credentials: "include",
      }),
    }),
    // More employee-related endpoints
  }),
});

export const {
  useGetEmployeeTaskQuery,
  useUpdateTaskByEmployeeMutation,
  useSubmitTaskMutation,
  useGetEmployeeInfoQuery
} = employeeApiSlice;
