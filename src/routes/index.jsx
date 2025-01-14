import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/Auth/ProtectedRoute";
import Home from "../components/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { useAuth } from "../context/AuthContext";

const getRoutes = () => {
  const { isAuthenticated } = useAuth();

  return [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/" /> : <Register />,
    },
  ];
};

export default getRoutes;
