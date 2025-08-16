import { createPortal } from "react-dom";

import { Backdrop } from "../backdrop/Backdrop.component";

import type { FC, ReactNode, MouseEvent } from "react";

//* 此為永存於 index.html 的一個結構，專門用來做 modal portal 用。
const portalElement = document.getElementById("overlays") as HTMLElement;

type PropsType = {
  children: ReactNode;
  backdropClose: (e: MouseEvent<HTMLElement>) => void;
};

export const ModalContainer: FC<PropsType> = ({
  children,
  backdropClose,
  ...otherProps
}) => {
  return (
    <>
      {createPortal(
        <Backdrop backdropClose={backdropClose} {...otherProps}>
          {children}
        </Backdrop>,
        portalElement
      )}
    </>
  );
};
