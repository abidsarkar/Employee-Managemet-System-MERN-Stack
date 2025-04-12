import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAdminLoginMutation, useEmployeeLoginMutation } from "../../assets/features/otherSlice/authApiSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../assets/features/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [adminLogin, { isLoading: adminLoading, error: adminError }] = useAdminLoginMutation();
  const [employeeLogin, { isLoading: empLoading, error: empError }] = useEmployeeLoginMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      let response;
      if (isAdmin) {
        response = await adminLogin({ email, password }).unwrap();
        dispatch(setCredentials({ role: "admin", data: response.admin }));
        // If login is successful
        
        navigate("/admin");
      } else {
        response = await employeeLogin({ email, password }).unwrap();
        dispatch(setCredentials({ role: "employee", data: response.employee }));
        navigate("/employee");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const loading = adminLoading || empLoading;
  const error = (adminError || empError)?.data?.message;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="border-2 border-emerald-600 p-8 md:p-12 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none bg-transparent placeholder:text-gray-400 text-white border-2 border-emerald-600 rounded-full py-3 px-5 text-lg focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 outline-none bg-transparent placeholder:text-gray-400 text-white border-2 border-emerald-600 rounded-full py-3 px-5 text-lg focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div className="flex items-center justify-center mt-4">
            <label className="text-white mr-2">Login as:</label>
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              {isAdmin ? "Admin" : "Employee"}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer mt-5 text-white border-none bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 rounded-full py-3 px-5 text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* <p className="text-white mt-4">Admin: abid@gmail.com pass:12345678</p> */}
        {/* <p className="text-white">Employee: bob@gmail.com pass:12345678</p> */}
        {/* <p className="text-red-600 italic">Note: As hosted in free service 1st time login may take time</p> */}
        {/* <p className="text-red-600 italic">Don't misuse the product</p> */}
        <p className="text-red-600 italic">THe app is having some upgrade. some of the feature may not working</p>
        
      </div>
    </div>
  );
};

export default Login;
