import React from "react";

const Login = () => {
  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <div className="border-2  border-emerald-600 p-20 ">
        <form className="flex flex-col items-center justify-center">
          <input className="outline-none bg-transparent placeholder:text-gray-300 dark:placeholder:text-white text-black dark:text-white border-2 border-emerald-600 rounded-full py-3 px-5 text-xl" type="email" placeholder="Enter your email" />
          <input className="mt-3 outline-none bg-transparent placeholder:text-black dark:placeholder:text-white text-black dark:text-white border-2 border-emerald-600 rounded-full py-3 px-5 text-xl" type="password" placeholder="enter your password" />
          <button className="mt-5 outline-none text-black dark:text-white border-none bg-emerald-600 rounded-full py-3 px-5 text-xl" >Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
