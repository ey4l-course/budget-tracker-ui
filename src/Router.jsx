import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Public } from "./layouts/Public";
import { Protected } from "./layouts/Protected";
import { Dashboard } from "./pages/Dashboard";
import { Profiles } from "./pages/Profiles";
import { StaticError } from "./pages/StaticError";
import { NewUserInit } from "./pages/NewUserInit";
import { Settings } from "./pages/Settings";
import { Export } from "./pages/Export";

const BASE = import.meta.env.VITE_API_BASE;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children:
    [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "error", element: <StaticError />}
    ]
  },
  {
    path: "/app",
    element: <Protected />,
    // loader: requireAuth,
    children:
    [
      {index: true, element: <Dashboard />},
      {path: "dashboard", element: <Dashboard />},
      {path: "profile", element: <Profiles />},
      {path: "new-user", element: <NewUserInit />},
      {path: "settings", element: <Settings />},
      {path: "export", element: <Export />}
    ]
  }
]);

export default router;