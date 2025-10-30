import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const NotFound = lazy(() => import("../modules/NotFound"));
const Login = lazy(() => import("../modules/auth/Login"));
const MapPage = lazy(() => import("../modules/map/MapPage"));
const TablePage = lazy(() => import("../modules/table/DataPage"));

export const router = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    element: <MainLayout />,
    children: [
      {
        //index: true
        path: "/map",
        element: <MapPage />,
      },
      { path: "/table", element: <TablePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
