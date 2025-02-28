import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import employeeReducer from "./features/employees/employeeSlice";
import taskReducer from "./features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    tasks: taskReducer,
  },
});