// making 1st draft for desktop and dark them
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandle = (e) => {
    e.preventDefault();
    // console.log("email :", email);
    // console.log("password :", password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <div className="border-2  border-emerald-600 p-20 ">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => {
            submitHandle(e);
          }}
        >
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // console.log('Chaining email');
            }}
            className="outline-none bg-transparent placeholder:text-gray-400  text-white border-2 border-emerald-600 rounded-full py-3 px-5 text-xl"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt-3 outline-none bg-transparent placeholder:text-gray-400 text-white border-2 border-emerald-600 rounded-full py-3 px-5 text-xl"
            type="password"
            placeholder="enter your password"
            required
          />
          <button className="cursor-pointer mt-5 outline-none text-white border-none bg-emerald-600 rounded-full py-3 px-5 text-xl">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
