import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import OrderCard from "../OrderCard/OrderCard.component";
import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";
import ModalPortal from "../ModalPortal/ModalPortal.component";

import { setAdminOrdersIsModalOpen } from "../../store/adminOrder/adminOrder.slice";
import { updateAdminOrdersAsync } from "../../store/adminOrder/adminOrder.asyncThunk";

import {
  selectAdminOrdersTempData,
  selectAdminOrdersIsLoading,
} from "../../store/adminOrder/adminOrder.selector";

import type { FC, ChangeEvent } from "react";
import type { Order } from "../../store/adminOrder/adminOrders.type";

import "./OrderModal.styles.scss";

const formContent = {
  customer: [
    { id: "email", title: "用戶信箱" },
    { id: "name", title: "顧客名稱" },
    { id: "address", title: "運送地址" },
    { id: "message", title: "客戶留言" },
  ],
};

type PropsType = {
  backdropClose: () => void;
};

const OrderModal: FC<PropsType> = ({ backdropClose }) => {
  const tempOrder = useAppSelector(selectAdminOrdersTempData);
  const isLoading = useAppSelector(selectAdminOrdersIsLoading);

  const [formData, setFormData] = useState({
    is_paid: "",
    status: 0,
    ...tempOrder,
  });

  const dispatch = useAppDispatch();

  //* 關閉 modal 函式
  const onCloseModalHandler = () => {
    dispatch(setAdminOrdersIsModalOpen(false));
  };

  //* 捕捉 input 輸入，並根據輸入資料種類來修改 formData
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement & HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    if (["is_paid"].includes(name)) {
      setFormData((preState) => ({ ...preState, [name]: checked }));
    } else {
      setFormData((preState) => ({ ...preState, [name]: value }));
    }
  };

  //* 提交表單函式
  const submit = () => {
    dispatch(updateAdminOrdersAsync(formData as Order));
  };

  useEffect(() => {
    if (tempOrder)
      setFormData({
        ...tempOrder,
        is_paid: tempOrder.is_paid,
        status: tempOrder.status,
      });
  }, [tempOrder]);

  return (
    <ModalPortal backdropClose={backdropClose}>
      <div className="order-modal">
        <div className="order-modal__header">
          <h1 className="order-modal__header-title">
            {`訂單編號： ${formData.id}`}
          </h1>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            aria-label="Close"
            onClick={onCloseModalHandler}
          >
            ｘ
          </Button>
        </div>

        <div className="order-modal__body">
          <div className="order-modal__body-upper">
            <div className="order-modal__body-customer">
              <h3 className="order-modal__body-customer-title">客戶資料</h3>
              {formContent.customer.map((info) => {
                return (
                  <div
                    className="order-modal__body-customer-info"
                    key={info.id}
                  >
                    <span className="order-modal__body-customer-info-title">
                      {info.title}
                    </span>
                    <div className="order-modal__body-customer-info-data">
                      <span className="order-modal__body-customer-info-data-span">
                        {tempOrder?.user[info.id as keyof Order["user"]] ||
                          "無"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="order-modal__body-payment">
              <h5 className="order-modal__body-payment-title">訂單狀態</h5>
              <div className="order-modal__body-payment-status">
                <div className="order-modal__body-payment-status-isPaid">
                  <label
                    className="order-modal__body-payment-status-isPaid-title"
                    htmlFor="is_paid"
                  >
                    付款狀態 ({formData.is_paid ? "已付款" : "未付款"})
                  </label>
                  <input
                    className="order-modal__body-payment-status-isPaid-input"
                    type="checkbox"
                    name="is_paid"
                    id="is_paid"
                    checked={!!formData.is_paid}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="order-modal__body-payment-status-progress">
                  <span className="order-modal__body-payment-status-progress-title">
                    出貨進度
                  </span>
                  <select
                    className="order-modal__body-payment-status-progress-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value={0}>未確認</option>
                    <option value={1}>已確認</option>
                    <option value={2}>外送中</option>
                    <option value={3}>已送達</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="order-modal__body-order">
            {tempOrder?.products && (
              <>
                <OrderCard products={Object.values(tempOrder.products)} />
                <div className="order-modal__body-order-total">
                  <div className="order-modal__body-order-total-title">
                    總金額：
                  </div>
                  <div className="order-modal__body-order-price">
                    ${Math.round(tempOrder.total)} 元
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="order-modal__footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onCloseModalHandler}
          >
            關閉
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={submit}
          >
            儲存
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default OrderModal;