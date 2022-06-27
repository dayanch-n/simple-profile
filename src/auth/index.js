/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";

const RequireAuth = ({
  children,
  redirectTo = "/login",
  user,
}) => {
  return user ? (children) : <Navigate to={redirectTo} />;
};

export default RequireAuth;
