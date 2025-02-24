import { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/LocalStroage";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  const [LoggedInUserData, setLoggedInUserData] = useState(null);
  const authData = useContext(AuthContext);
  
  // useEffect(() => {
  //   if (authData) {
  //     console.log("authData is ", authData);
  //     const loggedINUser = localStorage.getItem("loggedInUser");
  //     if (loggedINUser) {
  //       const parsedUser = JSON.parse(loggedINUser);
  //       setUser(parsedUser.role);
  //     }
  //   }
  // }, [authData]);
  useEffect(() => {
    if (!authData) return; // Prevent running effect if authData is null

    const loggedINUser = localStorage.getItem("loggedInUser");
    if (loggedINUser) {
      const parsedUser = JSON.parse(loggedINUser);
      setUser(parsedUser.role);
    }
  }, [authData]);
  const handleLogin = (email, password) => {
    if (email == "admin@example.com" && password == "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (authData && authData.employees.length > 0) {
      const employee = authData.employees.find(
        (e) => email == e.email && password == e.password
      );

      if (employee) {
        // employee1@example.com
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee" })
        );
      }else {
          alert("Invalid credentials");
        }
      
    } else {
      alert("invalid credential");
    }
  };
  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === "admin" ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard data={LoggedInUserData} />
      )}
    </>
  );
}

export default App;
