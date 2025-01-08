import { lazy } from "react";
import { Navigate } from "react-router-dom";

import type { RouteObject } from "react-router-dom";

const AdminLayout = lazy(
  () => import("../layouts/AdminLayout/AdminLayout.component")
);
const AdminProducts = lazy(
  () => import("../pages/AdminProducts/AdminProducts.component")
);
const Categories = lazy(
  () => import("../components/Categories/Categories.component")
);
const AdminCoupons = lazy(
  () => import("../pages/AdminCoupons/AdminCoupons.component")
);
const AdminOrders = lazy(
  () => import("../pages/AdminOrders/AdminOrders.component")
);

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="products" replace /> },
      { path: "products/:category", element: <AdminProducts /> },
      { path: "products", element: <Categories /> },
      { path: "coupons", element: <AdminCoupons /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },
];
