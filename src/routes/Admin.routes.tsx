import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../layouts/Dashboard/Dashboard.component";

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

const AdminRoutes = () => (
  <Routes>
    <Route element={<Dashboard />}>
      <Route index element={<Navigate to="products" />} />
      <Route path="products/:category" element={<AdminProducts />} />
      <Route path="products" element={<Categories />} />
      <Route path="coupons" element={<AdminCoupons />} />
      <Route path="orders" element={<AdminOrders />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
