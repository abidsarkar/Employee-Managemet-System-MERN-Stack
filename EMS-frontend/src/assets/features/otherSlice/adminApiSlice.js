import { apiSlice } from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/create",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/employee/create",
        method: "POST",
        body: employeeData,
        credentials: "include",
      }),
    }),
    addTask: builder.mutation({
      query: (taskData) => ({
        url: "/employee/addTask",
        method: "POST",
        body: taskData,
        credentials: "include",
      }),
    }),
    updateTaskAdmin: builder.mutation({
      query: (taskData) => ({
        url: "/employee/updateTaskAdmin",
        method: "PATCH",
        body: taskData,
        credentials: "include",
      }),
    }),
    getAllEmployeesList: builder.query({
      query: (pageInfo) => ({
        url: "/admin/getEmployeeList",
        method: "GET",
        body: pageInfo,
        credentials: "include",
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url: `/admin/employees/${employeeId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    // More admin-related endpoints
  }),
});

export const {
  useCreateAdminMutation,
  useCreateEmployeeMutation,
  useAddTaskMutation,
  useUpdateTaskAdminMutation,
  useGetAllEmployeesListQuery,
  useDeleteEmployeeMutation
} = adminApiSlice;
