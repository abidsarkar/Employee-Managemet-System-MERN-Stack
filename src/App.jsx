import { useEffect } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import { setLocalStorage } from "./utils/LocalStroage";

function App() {
  useEffect(() => {
    setLocalStorage( "employees","admin");
  }, []);

  return (
    <>
      <Login />
      {/* <EmployeeDashboard/> */}
      {/* <AdminDashboard/> */}
    </>
  );
}

export default App;
