import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ email, taskData }) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks`, taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ email, taskId, updates }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks/${taskId}`, updates);
    return response.data;
  }
);

export const submitTask = createAsyncThunk(
  "tasks/submitTask",
  async ({ email, taskId }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks/${taskId}/submit`);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ email, taskId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks/${taskId}`);
      return response.data; // Return the deleted task ID or relevant data
    } catch (err) {
      return rejectWithValue(err.response.data); // Pass the error response to the component
    }
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        const employee = state.employees.find(
          (emp) => emp.email === action.payload.email
        );
        if (employee) {
          employee.tasks.push(action.payload.task);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const employee = state.employees.find(
          (emp) => emp.email === action.payload.email
        );
        if (employee) {
          const taskIndex = employee.tasks.findIndex(
            (task) => task._id === action.payload.taskId
          );
          if (taskIndex !== -1) {
            employee.tasks[taskIndex] = action.payload.updates;
          }
        }
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        const employee = state.employees.find(
          (emp) => emp.email === action.payload.email
        );
        if (employee) {
          const taskIndex = employee.tasks.findIndex(
            (task) => task._id === action.payload.taskId
          );
          if (taskIndex !== -1) {
            employee.tasks[taskIndex].status = "finished";
            employee.tasks[taskIndex].submit_date = new Date();
          }
        }
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted task from the state
        state.tasks = state.tasks.filter((task) => task._id !== action.payload.taskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default taskSlice.reducer;