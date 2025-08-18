import type { FC } from "react";

import "./Hamburger.styles.scss";

type PropsType = {
  onClick: () => void;
  isActive: boolean;
  wrapperClass?: string;
  id?: string;
};

export const Hamburger: FC<PropsType> = ({
  onClick,
  isActive,
  wrapperClass,
  id = "hamburger",
}) => {
  const wrapeerClasses = `hamburger ${wrapperClass ? wrapperClass : ""} ${
    isActive ? "hamburger--active" : ""
  }`;
  return (
    <button className={wrapeerClasses} onClick={onClick} id={id}>
      <span className="hamburger__line" />
    </button>
  );
};
