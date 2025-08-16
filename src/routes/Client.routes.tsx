import { lazy } from "react";

import type { RouteObject } from "react-router-dom";

const MainLayout = lazy(
  () => import("../layouts/MainLayout/MainLayout.component")
);
const Home = lazy(() => import("../pages/Home/Home.component"));
const Products = lazy(() => import("../pages/Products/Products.component"));
const ProductDetail = lazy(
  () => import("../pages/ProductDetail/ProductDetail.component")
);
const Cart = lazy(() => import("../pages/Cart/Cart.page"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout.component"));
const Success = lazy(() => import("../pages/Success/Success.component"));
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs.component"));
const InfoSource = lazy(
  () => import("../pages/InfoSource/InfoSource.component")
);
const Member = lazy(() => import("../pages/Member/Member.component"));

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
