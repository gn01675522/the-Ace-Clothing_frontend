import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { AdminOrderModal } from "../admin-order-modal/AdminOrderModal.module";
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
      {isModalOpen && targetData && <AdminOrderModal />}
    </>
  );
};
