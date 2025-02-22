import { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/LocalStroage";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  const authData = useContext(AuthContext);
  useEffect(() => {
    if (authData) {
      const loggedINUser = localStorage.getItem("loggedInUser");
      if(loggedINUser){
        setUser(loggedINUser.role)
      }
    }
  }, [authData]);
  const handleLogin = (email, password) => {
    if (email == "admin@example.com" && password == "123") {
      // console.log("this is valid admin");
      setUser("admin");
      localStorage.setItem('loggedInUser' , JSON.stringify({role:'admin'}))
    } else if (
      authData &&
      authData.employees.find((e) => email == e.email && password == e.password)
    ) {
      // console.log('this is valid user');
      setUser("employee");
      localStorage.setItem('loggedInUser' , JSON.stringify({role:'employee'}))

    } else {
      alert("invalid credential");
    }
  };
  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === "admin" ? (
        <AdminDashboard  />
      ) : (
        <EmployeeDashboard  />
      )}
    </>
  );
}

export default App;
