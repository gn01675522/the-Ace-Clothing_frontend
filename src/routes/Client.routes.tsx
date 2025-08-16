import { lazy } from "react";

import type { RouteObject } from "react-router-dom";

const MainLayout = lazy(
  () => import("../layouts/MainLayout/MainLayout.component")
);
const Home = lazy(() => import("../pages/Home/Home.page"));
const Products = lazy(() => import("../pages/Products/Products.page"));
const ProductDetail = lazy(
  () => import("../pages/ProductDetail/ProductDetail.page")
);
const Cart = lazy(() => import("../pages/Cart/Cart.page"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout.page"));
const Success = lazy(() => import("../pages/Success/Success.page"));
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs.page"));
const InfoSource = lazy(
  () => import("../pages/InfoSource/InfoSource.page")
);
const Member = lazy(() => import("../pages/Member/Member.page"));

export const clientRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":category", element: <Products /> },
      { path: ":category/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "success/:orderId", element: <Success /> },
      { path: "about", element: <AboutUs /> },
      { path: "info-source", element: <InfoSource /> },
      { path: "member/:option", element: <Member /> },
    ],
  },
];
