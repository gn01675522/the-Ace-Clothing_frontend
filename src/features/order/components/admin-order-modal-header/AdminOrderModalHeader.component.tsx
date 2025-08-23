import { Button, BUTTON_TYPE_CLASS } from "../../../../components";

import type { FC, MouseEvent } from "react";

type PropsType = {
  formData: any;
  onClickToClose: (e: MouseEvent<HTMLElement>) => void;
};

export const AdminOrderModalHeader: FC<PropsType> = ({
  formData,
  onClickToClose,
}) => {
  return (
    <div className="order-modal__header">
      <h1 className="order-modal__header-title">
        {`訂單編號： ${formData?.id}`}
      </h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={onClickToClose}
      >
        ｘ
      </Button>
    </div>
  );
};
