import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { AdminOrderModalHeader } from "../../components/admin-order-modal-header/AdminOrderModalHeader.component";
import { AdminOrderModalFooter } from "../../components/admin-order-modal-footer/AdminOrderModalFooter.component";
import { AdminOrderModalList } from "../../components/admin-order-modal-list/AdminOrderModalList.component";
import { AdminOrderModalDetails } from "../../components/admin-order-modal-details/AdminOrderModalDetails.component";
import { ModalContainer } from "../../../../components/index";

import { updateAdminOrdersAsync } from "../../store/admin/adminOrder.asyncThunk";
import { selectAdminOrdersIsLoading } from "../../store/admin/adminOrder.selector";

import type {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import type { Order } from "../../DTOs/adminOrders.dtos";

import "./OrderModal.styles.scss";

type PropsType = {
  targetData: Order;
  closeAction: Dispatch<SetStateAction<boolean>>;
};

export const OrderModal: FC<PropsType> = ({ targetData, closeAction }) => {
  const [formData, setFormData] = useState<Order | null>(null);

  const isLoading = useAppSelector(selectAdminOrdersIsLoading);

  const dispatch = useAppDispatch();

  //* 捕捉 input 輸入，並根據輸入資料種類來修改 formData
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement & HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    if (name === "is_paid") {
      setFormData((prev) => (prev ? { ...prev, [name]: checked } : prev));
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeAction(false);
  };

  //* 提交表單函式
  const submit = () => {
    dispatch(updateAdminOrdersAsync(formData as Order));
    closeAction(false);
  };

  useEffect(() => {
    if (targetData) setFormData({ ...targetData });
  }, [targetData]);

  return (
    <ModalContainer backdropClose={onClickToClose}>
      <div className="order-modal">
        <AdminOrderModalHeader
          formData={formData}
          onClickToClose={onClickToClose}
        />
        <div className="order-modal__body">
          <AdminOrderModalDetails
            targetData={targetData}
            formData={formData}
            handleChange={handleChange}
            isLoading={isLoading}
          />
          <AdminOrderModalList targetData={targetData} />
        </div>
        <AdminOrderModalFooter
          onClickToClose={onClickToClose}
          submit={submit}
        />
      </div>
    </ModalContainer>
  );
};
