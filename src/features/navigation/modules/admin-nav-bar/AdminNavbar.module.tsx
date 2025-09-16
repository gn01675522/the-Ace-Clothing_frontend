import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useDropdownControl } from "../../hooks/navigation.hooks";

import { Button, BUTTON_TYPE_CLASS } from "@/components";
import { Hamburger } from "../../components/hamburger/Hamburger.component";
import { DropdownList } from "../../components/dropdown-list/DropdownList.component";

import type { FC } from "react";

import "./AdminNavbar.styles.scss";

const navOption = [
  { id: "1", title: "產品列表", link: "/admin/products" },
  { id: "2", title: "優惠卷列表", link: "/admin/coupons" },
  { id: "3", title: "訂單列表", link: "/admin/orders" },
];

type PropsType = {
  logout: () => void;
};

export const AdminNavbar: FC<PropsType> = ({ logout }) => {
  const { isDropdownOpen, dropdownRef, onClickIsDropdownOpen } =
    useDropdownControl();

  return (
    <nav className="admin-navbar">
      <Hamburger
        onClick={onClickIsDropdownOpen}
        isActive={isDropdownOpen}
        wrapperClass="admin-navbar__hamburger"
      />
      <DropdownList
        list={navOption}
        isDropdown={isDropdownOpen}
        ref={dropdownRef}
      />
      <NavLink className="admin-navbar__title" to="/admin/products">
        the Ace 後台管理系統
      </NavLink>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackMe}
        onClick={logout}
      >
        登出
      </Button>
    </nav>
  );
};
