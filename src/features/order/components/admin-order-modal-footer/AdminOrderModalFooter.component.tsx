import { Button, BUTTON_TYPE_CLASS } from "../../../../components";

import type { FC, MouseEvent } from "react";

type PropsType = {
  onClickToClose: (e: MouseEvent<HTMLElement>) => void;
  submit: () => void;
};

export const AdminOrderModalFooter: FC<PropsType> = ({
  onClickToClose,
  submit,
}) => {
  return (
    <div className="order-modal__footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onClickToClose}
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
  );
};
