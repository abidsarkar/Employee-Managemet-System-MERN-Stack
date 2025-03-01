import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Helper function to save user data to sessionStorage
const saveUserToSessionStorage = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

// Helper function to load user data from sessionStorage
const loadUserFromSessionStorage = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Async Thunk for Admin Login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, { email, password });
      const user = { role: "admin", data: response.data.admin };
      saveUserToSessionStorage(user); // Save user data to sessionStorage
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async Thunk for Employee Login
export const employeeLogin = createAsyncThunk(
  "auth/employeeLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/employee/login`, { email, password });
      const user = { role: "employee", data: response.data.employee };
      saveUserToSessionStorage(user); // Save user data to sessionStorage
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromSessionStorage(), // Load user data from sessionStorage on initial load
    loading: false,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload; // Restore user data from sessionStorage
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      sessionStorage.removeItem("user"); // Clear user data from sessionStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // Employee Login
      .addCase(employeeLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(employeeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { loginUser,logout } = authSlice.actions;
export default authSlice.reducer;