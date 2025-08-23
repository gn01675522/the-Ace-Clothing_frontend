import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { OrderCard } from "../order-card/OrderCard.component";

import type { FC } from "react";

export const AdminOrderModalList: FC = () => {
  const {
    formControl: { targetData },
  } = useAdminOrderContext();

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
