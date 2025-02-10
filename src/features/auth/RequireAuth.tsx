import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (auth?.idInstance && auth?.apiTokenInstance) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
}
