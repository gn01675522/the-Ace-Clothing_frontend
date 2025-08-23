import { OrderCard } from "../order-card/OrderCard.component";

import type { FC } from "react";
import type { Order } from "../../DTOs/adminOrders.dtos";

type PropsType = { targetData: Order };

export const AdminOrderModalList: FC<PropsType> = ({ targetData }) => {
  return (
    <div className="order-modal__body-order">
      {targetData?.products && (
        <>
          <OrderCard products={Object.values(targetData.products)} />
          <div className="order-modal__body-order-total">
            <div className="order-modal__body-order-total-title">總金額：</div>
            <div className="order-modal__body-order-price">
              ${Math.round(targetData.total)} 元
            </div>
          </div>
        </>
      )}
    </div>
  );
};
