import { useOrderManagementContext } from "../../hooks/admin-order-modal.hooks";

import { OrderCard } from "../../../../components/order-card/OrderCard.component";

import type { FC } from "react";

import "./AdminOrderModalList.styles.scss";

export const AdminOrderModalList: FC = () => {
  const {
    formControl: { targetData },
  } = useOrderManagementContext();

  return (
    <div className="admin-order-modal-list">
      {targetData?.products && (
        <>
          <OrderCard products={Object.values(targetData.products)} />
          <div className="admin-order-modal-list__total">
            <div className="admin-order-modal-list__total-title">總金額：</div>
            <div className="admin-order-modal-list__total-price">
              ${Math.round(targetData.total)} 元
            </div>
          </div>
        </>
      )}
    </div>
  );
};
