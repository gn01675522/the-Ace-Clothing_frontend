import {
  Button,
  BUTTON_TYPE_CLASS,
  ModalContainer,
} from "../../components/index";

import type { FC, MouseEvent } from "react";

import "./DeleteModal.styles.scss";

type PropsType = {
  id: string;
  title: string;
  actionControl: {
    closeAction: () => void;
    deleteAction: (id: string) => void;
  };
};

export const DeleteModal: FC<PropsType> = ({
  id,
  title,
  actionControl: { closeAction, deleteAction },
}) => {
  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeAction();
  };

  const onClickToDeleteHandler = () => {
    deleteAction(id);
    closeAction();
  };

  return (
    <ModalContainer backdropClose={onClickToClose}>
      <div className="delete-modal">
        <div className="delete-modal__header">
          <h1 className="delete-modal__header-title">刪除確認</h1>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            aria-label="Close"
            onClick={onClickToClose}
          >
            ｘ
          </Button>
        </div>
        <div className="delete-modal__body">確定刪除 {title}？</div>
        <div className="delete-modal__footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onClickToClose}
          >
            取消
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onClickToDeleteHandler}
          >
            確認刪除
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};
