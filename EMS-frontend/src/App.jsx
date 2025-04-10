import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import Error from "./components/Other/Error";
import { Provider } from "react-redux";
import { store } from "./assets/store";

import { apiSlice } from "./assets/features/api/apiSlice";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

function App() {
  return (
    
      
        <Routes>
          <Route index element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      
   
  );
}

export default App;