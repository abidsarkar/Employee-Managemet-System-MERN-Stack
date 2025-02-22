import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/LocalStroage";

function App() {
  
  const [user, setUser] = useState(null);
  const handleLogin = (email, password) => {
    if (email == "admin@example.com" && password == "123") {
      // console.log("this is valid admin");
      setUser("admin");
    } else if (email == "employee1@example.com" && password == "123") {
      // console.log('this is valid user');
      setUser("employee");
    } else {
      alert("invalid credential");
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user === 'admin' ? <AdminDashboard/> : <EmployeeDashboard/>}
      
    </>
  );
}

export default App;
