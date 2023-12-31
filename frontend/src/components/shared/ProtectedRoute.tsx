import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = () => {
  const { user, setUser } = useAuth();

  return user ? <Outlet /> : <Navigate to="signin" />;
};

export default ProtectedRoute;
