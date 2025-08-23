import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { OrderModal } from "../order-modal/OrderModal.module";
import { Loading } from "../../../../components";

import type { FC } from "react";

export const AdminOrderOverlay: FC = () => {
  const {
    stateFetch: { isLoading },
    formControl: { targetData },
    modalControl: { isModalOpen },
  } = useAdminOrderContext();
  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && targetData && <OrderModal />}
    </>
  );
};
