import { NavLink } from "react-router-dom";

import type { FC } from "react";

import "./NavList.styles.scss";

type PropsType = {
  navOption: { id: string; title: string; link: string }[];
  containerClass?: string;
  axisDirection?: "x" | "y";
};

export const NavList: FC<PropsType> = ({
  navOption,
  containerClass,
  axisDirection = "y",
}) => {
  const combinedContainerClass = `nav-list ${
    containerClass ?? ""
  } nav-list--${axisDirection}`;
  const combinedULClass = `nav-list__ul nav-list--${axisDirection}__ul`;
  const combinedItemClass = `nav-list__item nav-list--${axisDirection}__item`;

  return (
    <div className={combinedContainerClass}>
      <ul className={combinedULClass}>
        {navOption.map((option) => {
          return (
            <NavLink
              key={option.id}
              className={combinedItemClass}
              to={`${option.link}`}
            >
              {option.title}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};
