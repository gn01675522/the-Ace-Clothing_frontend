import { useAppDispatch } from "../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../Button/Button.component";
import { ModalPortal } from "../ModalPortal/ModalPortal.component";

import { deleteAdminProductAsync } from "../../features/product/index";

import { deleteAdminOrdersAsync } from "../../features/order/store/admin/adminOrder.asyncThunk";
import { deleteAdminCouponsAsync } from "../../features/admin-coupon/index";

import type { FC, Dispatch, SetStateAction, MouseEvent } from "react";
import type { AsyncThunk } from "@reduxjs/toolkit";
import type { ThunkAPIConfig } from "../../store/redux-utils";

import "./DeleteModal.styles.scss";

export enum DELETE_MODAL_TYPE {
  adminProduct = "adminProduct",
  adminCoupon = "adminCoupon",
  adminOrder = "adminOrder",
}

type DeleteConfigMap = {
  [DELETE_MODAL_TYPE.adminProduct]: AsyncThunk<void, string, ThunkAPIConfig>;
  [DELETE_MODAL_TYPE.adminCoupon]: AsyncThunk<void, string, ThunkAPIConfig>;
  [DELETE_MODAL_TYPE.adminOrder]: AsyncThunk<void, string, ThunkAPIConfig>;
};

//* 因有非常多情境可使用此 Modal，故無單一對應之 redux
//* 由於可能會給不同主題來使用，所以這邊使用計算屬性值的方式來透過 props 決定要使用哪種業務類別
const deleteAction = (
  type: DELETE_MODAL_TYPE
): DeleteConfigMap[DELETE_MODAL_TYPE] =>
  ({
    [DELETE_MODAL_TYPE.adminProduct]: deleteAdminProductAsync,
    [DELETE_MODAL_TYPE.adminCoupon]: deleteAdminCouponsAsync,
    [DELETE_MODAL_TYPE.adminOrder]: deleteAdminOrdersAsync,
  }[type]);

type PropsType = {
  dataType: DELETE_MODAL_TYPE;
  id: string;
  title: string;
  closeAction: Dispatch<SetStateAction<boolean>>;
};

const DeleteModal: FC<PropsType> = ({ dataType, id, title, closeAction }) => {
  const actionTarget = deleteAction(dataType);

  const dispatch = useAppDispatch();

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeAction(false);
  };

  const onClickToDeleteHandler = () => {
    dispatch(actionTarget(id));
    closeAction(false);
  };

  return (
    <ModalPortal backdropClose={onClickToClose}>
      <div className="delete-modal">
        <div className="delete-modal__header">
          <h1 className="delete-modal__header-title">刪除確認</h1>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            aria-label="Close"
            onClick={onClickToClose}
          >
            ｘ
          </Button>
        </div>
        <div className="delete-modal__body">確定刪除 {title}？</div>
        <div className="delete-modal__footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onClickToClose}
          >
            取消
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onClickToDeleteHandler}
          >
            確認刪除
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default DeleteModal;
