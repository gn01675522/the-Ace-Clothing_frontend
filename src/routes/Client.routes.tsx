import { lazy } from "react";

import type { RouteObject } from "react-router-dom";

const MainLayout = lazy(
  () => import("../layouts/main-layout/MainLayout.component")
);
const Home = lazy(() => import("../pages/home/Home.page"));
const Products = lazy(() => import("../pages/products/Products.page"));
const ProductDetail = lazy(
  () => import("../pages/product-detail/ProductDetail.page")
);
const Cart = lazy(() => import("../pages/cart/Cart.page"));
const Checkout = lazy(() => import("../pages/checkout/Checkout.page"));
const Success = lazy(() => import("../pages/success/Success.page"));
const AboutUs = lazy(() => import("../pages/about-us/AboutUs.page"));
const InfoSource = lazy(() => import("../pages/info-source/InfoSource.page"));
const Member = lazy(() => import("../pages/member/Member.page"));

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
