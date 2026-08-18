// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in, but not an admin — send them home instead of showing admin pages
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;