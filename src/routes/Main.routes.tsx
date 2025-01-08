import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { clientRoutes } from "./Client.routes"; 
import { adminRoutes } from "./Admin.routes";

import type { RouteObject } from "react-router-dom";

const Login = lazy(() => import("../pages/Login/Login.component"));

const combinedRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  ...adminRoutes,
  ...clientRoutes,
];

const MainRoutes = () => {
  const mainRoutes = useRoutes(combinedRoutes);
  return mainRoutes;
};

export default MainRoutes;
