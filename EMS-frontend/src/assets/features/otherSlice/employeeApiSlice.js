import { apiSlice } from "../api/apiSlice";
export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTask: builder.query({
      query: (employeeEmail) => ({
        url: "/employee/getTask",
        method: "GET",
        body: employeeEmail,
        credentials: "include",
      }),
    }),
    
    updateTaskByEmployee: builder.mutation({
      query: (updatedData) => ({
        url: "/employee/updateTaskEmployee",
        method: "PATCH",
        body: updatedData,
        credentials:"include"
      }),
      
    }),
    // More employee-related endpoints
  }),
});

export const { useGetEmployeeTaskQuery, } =
  employeeApiSlice;
