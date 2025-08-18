import { useState, useEffect } from "react";
import { useDropdownControl } from "../../hooks/navigation.hooks";

import { Hamburger } from "../../components/hamburger/Hamburger.component";
import { DropdownList } from "../../components/dropdown-list/DropdownList.component";
import { NavLogo } from "../../components/nav-logo/NavLogo.component";

import { CartIcon } from "../../../cart/index";

import type { FC } from "react";

import "./Navbar.styles.scss";

const navOption = [
  { title: "男裝", link: "/mens" },
  { title: "女裝", link: "/womens" },
  { title: "鞋子", link: "/shoes" },
  { title: "帽子", link: "/hats" },
  { title: "飾品", link: "/accessories" },
];

const NavBar: FC = () => {
  const { isDropdownOpen, dropdownRef, onClickIsDropdownOpen } =
    useDropdownControl();

  return (
    <nav className="navbar">
      <NavLogo />
      <DropdownList
        list={navOption}
        isDropdown={isDropdownOpen}
        ref={dropdownRef}
      />
      <CartIcon wrapperClass="navbar__cart-icon" />
      <Hamburger
        onClick={onClickIsDropdownOpen}
        isActive={isDropdownOpen}
        wrapperClass="navbar__hamburger"
      />
    </nav>
  );
};

export default NavBar;
