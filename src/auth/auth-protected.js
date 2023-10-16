import { Navigate, Outlet } from "react-router-dom";

const AuthProtectedRoute = ({ allowed = false, redirectURL = "/" }) => {
  if (allowed) return <Outlet />;

  return <Navigate to={redirectURL} />;
};

export default AuthProtectedRoute;
