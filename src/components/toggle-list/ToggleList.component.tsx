import type { FC, ReactNode } from "react";

import "./ToggleList.styles.scss";

type PropsType = {
  children: ReactNode;
  title: string;
  titleClass?: string;
};

export const ToggleList: FC<PropsType> = ({ children, title, titleClass }) => {
  const id = "toggle-list__trigger";

  const combinedTitleClass = `toggle-list__toggle-title ${titleClass ?? ""}`;

  return (
    <div className="toggle-list">
      <input className="toggle-list__input" id={id} type="checkbox" />
      <label htmlFor={id} className="toggle-list__toggle">
        <div className="toggle-list__toggle-triangle" />
        <h2 className={combinedTitleClass}>{title}</h2>
      </label>
      <div className="toggle-list__content">{children}</div>
    </div>
  );
};
