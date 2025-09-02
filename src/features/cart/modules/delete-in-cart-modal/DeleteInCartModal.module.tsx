import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import {
  Button,
  BUTTON_TYPE_CLASS,
  ModalContainer,
} from "../../../../components/index";

import {
  setCartIsModalOpen,
  selectCartTempData,
  setRemoveItemFromCartAsync,
} from "../../../../features/cart/index";

import type { FC } from "react";

import "./DeleteInCartModal.styles.scss";

type PropsType = {
  backdropClose: () => void;
};

export const DeleteInCartModal: FC<PropsType> = ({ backdropClose }) => {
  const dispatch = useAppDispatch();

  const itemId = useAppSelector(selectCartTempData);

  const modalAction = (type: "checked" | "close") => {
    if (type === "checked" && itemId) {
      dispatch(setRemoveItemFromCartAsync(itemId));
      dispatch(setCartIsModalOpen(false));
    } else if (type === "close") {
      dispatch(setCartIsModalOpen(false));
    }
  };
  //* 若為 checked，則移除購物車單項物件；反之為關閉 modal

  return (
    <ModalContainer backdropClose={backdropClose}>
      <div className="delete-in-cart-modal">
        <h1 className="delete-in-cart-modal__content">確認刪除此商品嗎？</h1>
        <div className="delete-in-cart-modal__function">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={() => modalAction("checked")}
          >
            確定刪除
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={() => modalAction("close")}
          >
            取消刪除
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};
