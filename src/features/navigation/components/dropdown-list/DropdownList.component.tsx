import { NavLink } from "react-router-dom";

import type { FC, RefObject } from "react";

import "./DropdownList.styles.scss";

type PropsType = {
  list: { title: string; link: string }[];
  isDropdown: boolean;
  ref?: RefObject<HTMLUListElement | null>;
};

export const DropdownList: FC<PropsType> = ({ list, isDropdown, ref }) => {
  return (
    <ul
      className={`nav-list ${isDropdown ? "nav-list--dropdown" : ""}`}
      ref={ref}
    >
      {list.map((item) => (
        <li key={item.title} className="nav-list__item">
          <NavLink
            to={item.link}
            aria-label={item.title}
            className="nav-list__item-link"
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
