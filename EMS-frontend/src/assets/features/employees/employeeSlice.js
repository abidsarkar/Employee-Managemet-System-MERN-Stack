import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:5000/employees");
    return response.data;
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData) => {
    const response = await axios.post("http://localhost:5000/employees", employeeData);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (email, { rejectWithValue }) => {
    try {
      const response =await axios.delete(`http://localhost:5000/employees/${email}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
}
);
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(employee => employee.email !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;