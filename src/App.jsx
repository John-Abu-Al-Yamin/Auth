import { Routes as RouterRoutes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const routes = getRoutes(); // Call the function to get the routes array

  return (
      <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <RouterRoutes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </RouterRoutes>
        <ToastContainer />
      </div>
  );
}

export default App;
