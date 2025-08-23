import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";

import type { FC } from "react";

export const AdminOrderModalHeader: FC = () => {
  const {
    formControl: { formData },
    modalControl: { switchAdminOrderModalOpen },
  } = useAdminOrderContext();

  return (
    <div className="order-modal__header">
      <h1 className="order-modal__header-title">
        {`訂單編號： ${formData?.id}`}
      </h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={switchAdminOrderModalOpen}
      >
        ｘ
      </Button>
    </div>
  );
};
