import { lazy } from "react";
import { Navigate } from "react-router-dom";

import type { RouteObject } from "react-router-dom";

const AdminLayout = lazy(
  () => import("../layouts/AdminLayout/AdminLayout.component")
);
const AdminProducts = lazy(
  () => import("../pages/admin-products/AdminProducts.page")
);
const Categories = lazy(
  () => import("../features/navigation/modules/categories/Categories.component")
);
const AdminCoupons = lazy(
  () => import("../pages/admin-coupons/AdminCoupons.page")
);
const AdminOrders = lazy(
  () => import("../pages/admin-orders/AdminOrders.page")
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
