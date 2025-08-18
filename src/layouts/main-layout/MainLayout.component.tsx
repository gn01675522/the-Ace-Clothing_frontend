import { Outlet } from "react-router-dom";

import { NavBar, Footer } from "../../features/navigation/index";

import type { FC } from "react";

const MainLayout: FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="main-layout__footer">
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
