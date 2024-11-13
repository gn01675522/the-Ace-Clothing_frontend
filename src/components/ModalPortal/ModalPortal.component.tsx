import { createPortal } from "react-dom";

import ModalBackdrop from "./ModalBackdrop.component";

import type { FC, ReactNode } from "react";

//* 此為永存於 index.html 的一個結構，專門用來做 modal portal 用。
const portalElement = document.getElementById("overlays") as HTMLElement;

type PropsType = {
  children: ReactNode;
  backdropClose: () => void;
};

const ModalPortal: FC<PropsType> = ({
  children,
  backdropClose,
  ...otherProps
}) => {
  return (
    <>
      {createPortal(
        <ModalBackdrop backdropClose={backdropClose} {...otherProps}>
          {children}
        </ModalBackdrop>,
        portalElement
      )}
    </>
  );
};

export default ModalPortal;
