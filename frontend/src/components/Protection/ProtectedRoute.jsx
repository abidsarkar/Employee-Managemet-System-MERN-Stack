import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ role }) => {
  const  user  = useSelector((state) => state.auth.user);
  // console.log(user);

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user role doesn't match, redirect to login page
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in and role matches, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;