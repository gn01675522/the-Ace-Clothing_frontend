import { useEffect, FC } from "react";
import { useAppDispatch } from "../../store/redux-hooks";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar/Navbar.component";
import Footer from "./components/Footer/Footer.component";

import { fetchCartItemsAsync } from "../../store/cart/cart.asyncThunk";

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
