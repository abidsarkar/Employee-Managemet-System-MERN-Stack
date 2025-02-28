import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import Error from "./components/Other/Error";
import ProtectedRoute from "./components/Protection/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./assets/features/auth/authSlice";


function App() {
  const dispatch = useDispatch();
  
  // Restore user data from sessionStorage on app load
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    if (user) {
      dispatch(loginUser(user)); // Dispatch loginUser action to restore state
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route element={<ProtectedRoute role="employee" />}>
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Route>
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default App;