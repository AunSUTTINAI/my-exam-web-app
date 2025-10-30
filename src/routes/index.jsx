import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const NotFound = lazy(() => import("../modules/NotFound"));
const Login = lazy(() => import("../modules/auth/Login"));
const App = lazy(() => import("../modules/App"));

export const router = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
