import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};