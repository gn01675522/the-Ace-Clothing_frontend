import { useCartStateFetch } from "../../hooks/cart.hooks";

import { Loading, Message } from "../../../../components/index";
import { DeleteInCartModal } from "../../../../modules/index";

import type { FC } from "react";

type PropsType = {
  hasMessage: boolean;
};

export const CartOverlay: FC<PropsType> = ({ hasMessage }) => {
  const { isLoading, isModalOpen, onClickToCloseModalInBackdrop } =
    useCartStateFetch();

  return (
    <>
      {isLoading && <Loading />}
      {hasMessage && <Message />}
      {isModalOpen && (
        <DeleteInCartModal backdropClose={onClickToCloseModalInBackdrop} />
      )}
    </>
  );
};
