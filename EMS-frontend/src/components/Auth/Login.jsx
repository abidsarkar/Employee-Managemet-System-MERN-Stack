// making 1st draft for desktop and dark them
import React, { useState } from "react";

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandle = (e) => {
    e.preventDefault();
    handleLogin(email,password)
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 px-4">
  <div className="border-2 border-emerald-600 p-8 md:p-12 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
    <form
      className="flex flex-col"
      onSubmit={(e) => submitHandle(e)}
    >
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
      <button className="cursor-pointer mt-5 text-white border-none bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 rounded-full py-3 px-5 text-lg shadow-md">
        Login
      </button>
    </form>
  </div>
</div>

  );
};

export default Login;
