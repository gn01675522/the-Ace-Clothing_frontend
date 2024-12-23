import type { FC, ReactNode, MouseEvent } from "react";

import "./ModalBackdrop.styles.scss";

type PropsType = {
  children: ReactNode;
  backdropClose: (e: MouseEvent<HTMLElement>) => void;
};

const ModalBackdrop: FC<PropsType> = ({ children, backdropClose }) => {
  return (
    <>
      <div className="modal__backdrop" onClick={backdropClose}>
        <div className="modal">{children}</div>
      </div>
    </>
  );
};

export default ModalBackdrop;
