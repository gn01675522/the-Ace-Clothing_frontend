import type { FC, ReactNode, MouseEvent } from "react";

import "./Backdrop.styles.scss";

type PropsType = {
  children: ReactNode;
  backdropClose: (e: MouseEvent<HTMLElement>) => void;
};

export const Backdrop: FC<PropsType> = ({ children, backdropClose }) => {
  return (
    <>
      <div className="modal__backdrop" onClick={backdropClose}>
        <div className="modal">{children}</div>
      </div>
    </>
  );
};
