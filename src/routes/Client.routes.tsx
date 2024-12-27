import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout.component";

const Home = lazy(() => import("../pages/Home/Home.component"));
const Products = lazy(() => import("../pages/Products/Products.component"));
const ProductDetail = lazy(
  () => import("../pages/ProductDetail/ProductDetail.component")
);
const Cart = lazy(() => import("../pages/Cart/Cart.component"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout.component"));
const Success = lazy(() => import("../pages/Success/Success.component"));
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs.component"));
const InfoSource = lazy(
  () => import("../pages/InfoSource/InfoSource.component")
);
const Member = lazy(() => import("../pages/Member/Member.component"));

const ClientRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path=":category" element={<Products />} />
      <Route path=":category/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="success/:orderId" element={<Success />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="info-source" element={<InfoSource />} />
      <Route path="member/:option" element={<Member />} />
    </Route>
  </Routes>
);

export default ClientRoutes;
