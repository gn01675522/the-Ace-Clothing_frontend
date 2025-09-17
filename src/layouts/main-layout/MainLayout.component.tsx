import { Outlet } from "react-router-dom";

import { NavBar, Footer } from "@/features/navigation/index";

import { useToScrollToTop } from "@/shared/hooks/shared.hooks";

import type { FC } from "react";

const navOption = [
  { id: "1", title: "男裝", link: "/mens" },
  { id: "2", title: "女裝", link: "/womens" },
  { id: "3", title: "鞋子", link: "/shoes" },
  { id: "4", title: "帽子", link: "/hats" },
  { id: "5", title: "飾品", link: "/accessories" },
];

const MainLayout: FC = () => {
  useToScrollToTop();
  return (
    <>
      <header>
        <NavBar navOption={navOption} />
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
