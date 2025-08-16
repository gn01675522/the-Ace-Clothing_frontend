import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import AceSVGIcon from "../../../../components/SVGIcons/AceSVGIcon.component";
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
  const [isListOpen, setIsListOpen] = useState(false);

  const onOpenList = () => {
    setIsListOpen(!isListOpen);
  };

  const isMobileWidth = () => {
    if (window.innerWidth > 768) {
      setIsListOpen(false);
    }
  };
  //* 解決螢幕寬度小於 768px 時開啟 navlist 後，切換到大於 768 後 isListOpen 還是 true 的狀態

  useEffect(() => {
    window.addEventListener("resize", isMobileWidth);
    return () => {
      window.removeEventListener("resize", isMobileWidth);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <input
          className="navbar__trigger"
          type="checkbox"
          id="nav-trigger"
          checked={isListOpen ? true : false}
          onChange={onOpenList}
          title="check to open nav list"
        />
        <NavLink to="/" aria-label="home page" className="navbar__home-logo">
          <AceSVGIcon className="navbar__home-logo-icon" />
        </NavLink>
        <div className="navbar__list">
          {navOption.map((option) => (
            <NavLink
              key={option.title}
              to={option.link}
              className="navbar__list-link"
              aria-label={option.title}
              onClick={onOpenList}
            >
              {option.title}
            </NavLink>
          ))}
        </div>
        <div className="navbar__actions">
          <CartIcon />
        </div>
        <label className="navbar__burger" htmlFor="nav-trigger">
          <div className="navbar__burger-line" />
        </label>
      </nav>
      <div className="block" />
    </>
  );
};

export default NavBar;
