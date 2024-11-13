import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";
import ModalBackdrop from "../ModalPortal/ModalBackdrop.component";

import { setAdminProductModalOpen } from "../../store/adminProduct/adminProduct.slice";
import { deleteAdminProductAsync } from "../../store/adminProduct/adminProduct.asyncThunk";

import { selectAdminProductTempData } from "../../store/adminProduct/adminProduct.selector";

import { setAdminOrdersIsModalOpen } from "../../store/adminOrder/adminOrder.slice";
import { deleteAdminOrdersAsync } from "../../store/adminOrder/adminOrder.asyncThunk";
import { selectAdminOrdersTempData } from "../../store/adminOrder/adminOrder.selector";
import { deleteAdminCouponsAsync } from "../../store/adminCoupon/adminCoupon.asyncThunk";
import { setAdminCouponsOpen } from "../../store/adminCoupon/adminCoupon.slice";
import { selectAdminCouponsTempData } from "../../store/adminCoupon/adminCoupon.selector";

import type { FC } from "react";
import type { AsyncThunk, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { AdminProduct } from "../../store/adminProduct/adminProduct.types";
import type { Order } from "../../store/adminOrder/adminOrders.type";
import type { AdminCouponWithId } from "../../store/adminCoupon/adminCoupon.types";
import type { ThunkAPIConfig } from "../../store/redux-utils";

import "./DeleteModal.styles.scss";

export enum DELETE_MODAL_TYPE {
  adminProduct = "adminProduct",
  adminCoupon = "adminCoupon",
  adminOrder = "adminOrder",
}

type DeleteConfig<T> = {
  isModalOpen: ActionCreatorWithPayload<boolean, any>;
  deleteAction: AsyncThunk<void, string, ThunkAPIConfig>;
  deleteItem: (state: RootState) => T | null;
};

type DeleteConfigMap = {
  [DELETE_MODAL_TYPE.adminProduct]: DeleteConfig<AdminProduct>;
  [DELETE_MODAL_TYPE.adminCoupon]: DeleteConfig<AdminCouponWithId>;
  [DELETE_MODAL_TYPE.adminOrder]: DeleteConfig<Order>;
};

//* 因有非常多情境可使用此 Modal，故無單一對應之 redux
//* 由於可能會給不同主題來使用，所以這邊使用計算屬性值的方式來透過 props 決定要使用哪種業務類別
const deleteTarget = (
  type: DELETE_MODAL_TYPE
): DeleteConfigMap[DELETE_MODAL_TYPE] =>
  ({
    [DELETE_MODAL_TYPE.adminProduct]: {
      isModalOpen: setAdminProductModalOpen,
      deleteAction: deleteAdminProductAsync,
      deleteItem: selectAdminProductTempData,
    },
    [DELETE_MODAL_TYPE.adminCoupon]: {
      isModalOpen: setAdminCouponsOpen,
      deleteAction: deleteAdminCouponsAsync,
      deleteItem: selectAdminCouponsTempData,
    },
    [DELETE_MODAL_TYPE.adminOrder]: {
      isModalOpen: setAdminOrdersIsModalOpen,
      deleteAction: deleteAdminOrdersAsync,
      deleteItem: selectAdminOrdersTempData,
    },
  }[type]);

type PropsType = {
  dataType: DELETE_MODAL_TYPE;
  backdropClose: () => void;
};

const DeleteModal: FC<PropsType> = ({ dataType, backdropClose }) => {
  const actionTarget = deleteTarget(dataType) as DeleteConfig<
    AdminProduct | AdminCouponWithId | Order
  >;

  const dispatch = useAppDispatch();

  const isModalOpen = deleteTarget(dataType).isModalOpen;
  const deleteDataAction = deleteTarget(dataType).deleteAction;
  const deleteItem = useAppSelector(actionTarget.deleteItem);

  const id = (deleteItem as AdminProduct | AdminCouponWithId | Order)?.id;
  const title = (deleteItem as AdminProduct | AdminCouponWithId | Order)?.title;

  const onCloseModalHandler = () => {
    dispatch(isModalOpen(false));
  };

  const onDeleteHandler = () => {
    dispatch(deleteDataAction(id));
  };

  return (
    <ModalBackdrop backdropClose={backdropClose}>
      <div className="delete-modal">
        <div className="delete-modal__header">
          <h1 className="delete-modal__header-title">刪除確認</h1>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            aria-label="Close"
            onClick={onCloseModalHandler}
          >
            ｘ
          </Button>
        </div>
        <div className="delete-modal__body">
          確定刪除 {dataType === "adminOrder" ? id : title}？
        </div>
        <div className="delete-modal__footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onCloseModalHandler}
          >
            取消
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onDeleteHandler}
          >
            確認刪除
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default DeleteModal;
