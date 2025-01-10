import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
