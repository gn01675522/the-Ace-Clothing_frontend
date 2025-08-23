import type { FC, ChangeEvent } from "react";
import type { Order } from "../../DTOs/adminOrders.dtos";

const formContent = {
  customer: [
    { id: "email", title: "用戶信箱" },
    { id: "name", title: "顧客名稱" },
    { id: "address", title: "運送地址" },
    { id: "message", title: "客戶留言" },
  ],
};

type PropsType = {
  targetData: Order;
  formData: Order | null;
  handleChange: (e: ChangeEvent<HTMLSelectElement & HTMLInputElement>) => void;
  isLoading: boolean;
};

export const AdminOrderModalDetails: FC<PropsType> = ({
  targetData,
  formData,
  handleChange,
  isLoading,
}) => {
  return (
    <div className="order-modal__body-upper">
      <div className="order-modal__body-customer">
        <h3 className="order-modal__body-customer-title">客戶資料</h3>
        {formContent.customer.map((info) => {
          return (
            <div className="order-modal__body-customer-info" key={info.id}>
              <span className="order-modal__body-customer-info-title">
                {info.title}
              </span>
              <div className="order-modal__body-customer-info-data">
                <span className="order-modal__body-customer-info-data-span">
                  {(info.id === "message"
                    ? targetData.message
                    : targetData?.user[info.id as keyof Order["user"]]) || "無"}
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
              付款狀態 ({formData?.is_paid ? "已付款" : "未付款"})
            </label>
            <input
              className="order-modal__body-payment-status-isPaid-input"
              type="checkbox"
              name="is_paid"
              id="is_paid"
              checked={!!formData?.is_paid}
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
              value={formData?.status}
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
  );
};
