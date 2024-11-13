import type { FC, ReactNode } from "react";

import "./ModalBackdrop.styles.scss";

type PropsType = {
  children: ReactNode;
  backdropClose: () => void;
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
