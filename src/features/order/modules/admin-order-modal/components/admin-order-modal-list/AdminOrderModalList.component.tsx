import { useOrderManagementContext } from "../../hooks/admin-order-modal.hooks";
import { ToggleList } from "../../../../../../components/index";

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
          <ToggleList title="訂單內容">
            {Object.values(targetData.products).map((product) => (
              <OrderCard key={product.id} {...product.product} />
            ))}
          </ToggleList>
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
