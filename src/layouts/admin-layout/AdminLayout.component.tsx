import { Outlet } from "react-router-dom";

import { useAdminUserAuth } from "@/features/user";
import { AdminNavbar, NavList } from "@/features/navigation";

import { Message } from "@/components/index";

import { useToScrollToTop } from "@/shared/hooks/shared.hooks";

import type { FC } from "react";

import "./AdminLayout.styles.scss";

const navOption = [
  { id: "1", title: "產品列表", link: "/admin/products" },
  { id: "2", title: "優惠卷列表", link: "/admin/coupons" },
  { id: "3", title: "訂單列表", link: "/admin/orders" },
];

const AdminLayout: FC = () => {
  useToScrollToTop();
  const { logout, hasMessage } = useAdminUserAuth();

  return (
    <div className="admin-layout">
      {hasMessage && <Message />}
      <header className="admin-layout__header">
        <AdminNavbar logout={logout} />
      </header>
      <main className="admin-layout__content">
        <NavList
          navOption={navOption}
          axisDirection="y"
          containerClass="admin-layout__nav-list"
        />
        <div className="admin-layout__content-wrapper">
          <Outlet />
        </div>
      </main>
      <footer className="admin-layout__footer">
        <span className="admin-layout__footer-hint">
          * 請使用平板或桌上型電腦查看，以確保最佳瀏覽體驗。
        </span>
      </footer>
    </div>
  );
};

export default AdminLayout;
