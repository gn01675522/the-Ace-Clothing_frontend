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
  const combinedWrapperClass = `hamburger ${wrapperClass ?? ""}`;
  const lineClasses = `hamburger__line ${
    isActive ? "hamburger__line--active" : ""
  }`;
  return (
    <button className={combinedWrapperClass} onClick={onClick} id={id}>
      <span className={lineClasses} />
    </button>
  );
};
