import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Public } from "./layouts/Public";
import { Protected } from "./layouts/Protected";
import { Dashboard } from "./pages/Dashboard";
import { Profiles } from "./pages/Profiles";

const BASE = import.meta.env.VITE_API_BASE;

const requireAuth = async () => {
  console.log(BASE);
  const res = await fetch (BASE+"/auth/check-session", { credentials: "include" });
  if (!res.ok) throw redirect ("/login");
  return null;
};

export default createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children:
    [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },
  {
    path: "/app",
    element: <Protected />,
    loader: requireAuth,
    children:
    [
      {index: true, element: <Dashboard />},
      {path: "dashboard", element: <Dashboard />},
      {path: "profile", element: <Profiles />}
    ]
  }
]);