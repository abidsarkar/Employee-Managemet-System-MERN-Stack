import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { adminLogin, employeeLogin } from "../../assets/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between admin and employee login

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      let resultAction;
      if (isAdmin) {
        // Admin login
        resultAction = await dispatch(adminLogin({ email, password }));
      } else {
        // Employee login
        resultAction = await dispatch(employeeLogin({ email, password }));
      }

      // Check if the login was successful
      if (adminLogin.fulfilled.match(resultAction) || employeeLogin.fulfilled.match(resultAction)) {
        // Redirect based on role
        const role = resultAction.payload.role;
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "employee") {
          navigate("/employee");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="border-2 border-emerald-600 p-8 md:p-12 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="flex flex-col" onSubmit={submitHandle}>
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
      </div>
    </div>
  );
};

export default Login;