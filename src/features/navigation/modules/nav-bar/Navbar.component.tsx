import {
  useDropdownControl,
  useFetchCartItems,
} from "../../hooks/navigation.hooks";
import { NavList } from "../../components/nav-list/NavList.component";

import { Hamburger } from "../../components/hamburger/Hamburger.component";
import { DropdownList } from "../../components/dropdown-list/DropdownList.component";
import { NavLogo } from "../../components/nav-logo/NavLogo.component";

import { CartIcon } from "../../../cart/index";

import type { FC } from "react";

import "./Navbar.styles.scss";

type PropsType = {
  navOption: { id: string; title: string; link: string }[];
};

export const NavBar: FC<PropsType> = ({ navOption }) => {
  const { isDropdownOpen, dropdownRef, onClickIsDropdownOpen } =
    useDropdownControl();

  useFetchCartItems();

  return (
    <nav className="navbar">
      <NavLogo />
      <NavList
        navOption={navOption}
        axisDirection="x"
        containerClass="navbar__nav-list"
      />
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
