import { useAppSelector } from "../../../../../../store/redux-hooks";

import { useOrderManagementContext } from "../../hooks/admin-order-modal.hooks";

import { selectAdminOrdersIsLoading } from "../../../../store/admin/adminOrder.selector";

import type { FC } from "react";
import type { AdminOrderDto } from "../../../../DTOs/adminOrders.dtos";

import "./AdminOrderModalDetails.styles.scss";

const formContent = {
  customer: [
    { id: "email", title: "用戶信箱" },
    { id: "name", title: "顧客名稱" },
    { id: "address", title: "運送地址" },
    { id: "message", title: "客戶留言" },
  ],
};

export const AdminOrderModalDetails: FC = () => {
  const {
    formControl: { targetData, formData, onChangeHandler },
  } = useOrderManagementContext();

  const isLoading = useAppSelector(selectAdminOrdersIsLoading);

  return (
    <div className="admin-order-modal-detail">
      <div className="admin-order-modal-detail__customer">
        <h3 className="admin-order-modal-detail__customer-title">客戶資料</h3>
        {formContent.customer.map((info) => {
          return (
            <div
              className="admin-order-modal-detail__customer-info"
              key={info.id}
            >
              <span className="admin-order-modal-detail__customer-info-title">
                {info.title}
              </span>
              <div className="admin-order-modal-detail__customer-info-data">
                <span className="admin-order-modal-detail__customer-info-data-span">
                  {(info.id === "message"
                    ? targetData?.message
                    : targetData?.user[
                        info.id as keyof AdminOrderDto["user"]
                      ]) || "無"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="admin-order-modal-detail__payment">
        <h5 className="admin-order-modal-detail__payment-title">訂單狀態</h5>
        <div className="admin-order-modal-detail__payment-status">
          <div className="admin-order-modal-detail__payment-status-isPaid">
            <label
              className="admin-order-modal-detail__payment-status-isPaid-title"
              htmlFor="is_paid"
            >
              付款狀態 ({formData?.is_paid ? "已付款" : "未付款"})
            </label>
            <input
              className="admin-order-modal-detail__payment-status-isPaid-input"
              type="checkbox"
              name="is_paid"
              id="is_paid"
              checked={!!formData?.is_paid}
              onChange={onChangeHandler}
              disabled={isLoading}
            />
          </div>

          <div className="admin-order-modal-detail__payment-status-progress">
            <span className="admin-order-modal-detail__payment-status-progress-title">
              出貨進度
            </span>
            <select
              className="admin-order-modal-detail__payment-status-progress-select"
              name="status"
              value={formData?.status}
              onChange={onChangeHandler}
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
  );
};
