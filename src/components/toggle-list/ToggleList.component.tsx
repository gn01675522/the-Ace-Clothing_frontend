import type { FC, ReactNode } from "react";

import "./ToggleList.styles.scss";

type PropsType = {
  children: ReactNode;
  title: string;
};

export const ToggleList: FC<PropsType> = ({ children, title }) => {
  const id = "toggle-list__trigger";

  return (
    <div className="toggle-list">
      <input className="toggle-list__input" id={id} type="checkbox" />
      <label htmlFor={id} className="toggle-list__toggle">
        <div className="toggle-list__toggle-triangle" />
        <h2 className="toggle-list__toggle-title">{title}</h2>
      </label>
      <div className="toggle-list__content">{children}</div>
    </div>
  );
};
