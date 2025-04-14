import { apiSlice } from "../api/apiSlice";
export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
} = employeeApiSlice;
