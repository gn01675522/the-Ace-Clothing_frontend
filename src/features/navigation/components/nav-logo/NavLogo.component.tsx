import { NavLink } from "react-router-dom";
import { AceSVGIcon } from "../../../../components/index";

import type { FC } from "react";

import "./NavLogo.styles.scss";

export const NavLogo: FC = () => {
  return (
    <NavLink to="/" aria-label="home page" className="nav-logo">
      <AceSVGIcon className="nav-logo__icon" />
    </NavLink>
  );
};
