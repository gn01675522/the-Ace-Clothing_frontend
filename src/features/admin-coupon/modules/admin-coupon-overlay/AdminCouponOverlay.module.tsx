import { useAdminCouponContext } from "../../hooks/admin-coupon.hooks";

import { Loading } from "../../../../components";
import { AdminCouponModal } from "../admin-coupon-modal/AdminCouponModal.module";

import type { FC } from "react";

export const AdminCouponOverlay: FC = () => {
  const {
    modalControl: { isModalOpen },
    stateFetch: { isLoading },
  } = useAdminCouponContext();

  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && <AdminCouponModal />}
    </>
  );
};
