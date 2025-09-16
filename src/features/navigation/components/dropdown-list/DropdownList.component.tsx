import { NavLink } from "react-router-dom";

import type { FC, RefObject } from "react";

import "./DropdownList.styles.scss";

type PropsType = {
  list: { title: string; link: string }[];
  isDropdown: boolean;
  ref?: RefObject<HTMLUListElement | null>;
  className?: string;
};

export const DropdownList: FC<PropsType> = ({
  list,
  isDropdown,
  ref,
  className,
}) => {
  const containerClass = `dropdown-list ${className ?? ""} ${
    isDropdown ? "dropdown-list--dropdown" : ""
  }`;

  return (
    <ul className={containerClass} ref={ref}>
      {list.map((item) => (
        <li key={item.title} className="dropdown-list__item">
          <NavLink
            to={item.link}
            aria-label={item.title}
            className="dropdown-list__item-link"
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
