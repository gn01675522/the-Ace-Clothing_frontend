import { Outlet } from "react-router-dom";
import { useAdminUserAuth } from "@/features/user";
import { AdminNavbar, NavList } from "@/features/navigation";

import { Message } from "@/components/index";

import type { FC } from "react";

import "./AdminLayout.styles.scss";

const navOption = [
  { id: "1", title: "產品列表", link: "/admin/products" },
  { id: "2", title: "優惠卷列表", link: "/admin/coupons" },
  { id: "3", title: "訂單列表", link: "/admin/orders" },
];

const AdminLayout: FC = () => {
  const { logout, hasMessage } = useAdminUserAuth();

  return (
    <div className="admin-layout-main">
      {hasMessage && <Message />}
      <header className="admin-layout-main__header">
        <AdminNavbar logout={logout} />
      </header>
      <main className="admin-layout-main__content">
        <NavList
          navOption={navOption}
          axisDirection="y"
          containerClass="admin-layout-main__nav-list"
        />
        <div className="admin-layout-main__content-wrapper">
          <Outlet />
        </div>
      </main>
      <footer className="admin-layout-main__footer">
        <span className="admin-layout-main__footer-hint">
          * 請使用平板或桌上型電腦查看，以確保最佳瀏覽體驗。
        </span>
      </footer>
    </div>
  );
};

export default AdminLayout;
