import { useEffect } from "react";
import { useAppDispatch } from "../../store/redux-hooks";
import { Outlet } from "react-router-dom";

import { NavBar, Footer } from "../../features/navigation/index";

import { fetchCartItemsAsync } from "../../features/cart/index";

import type { FC } from "react";

const MainLayout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
