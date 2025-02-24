import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const authData = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser.role);
      setLoggedInUserData(loggedInUser.data);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setUser(res.data.role);
      setLoggedInUserData(res.data.employee || null);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === "admin" ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard data={loggedInUserData} />
      )}
    </>
  );
}

export default App;
