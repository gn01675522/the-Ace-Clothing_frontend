import { DeleteModal, useDeleteModalControl } from "@/modules/index";

import { Loading } from "@/components/index";

import {
  AdminCouponTable,
  AdminCouponModal,
  useAdminCouponStateFetch,
  useAdminCouponActionControl,
  type AdminCouponDto,
} from "@/features/admin-coupon/index";

import type { FC } from "react";

import "./AdminCoupons.styles.scss";

const AdminCoupons: FC = () => {
  const { isLoading, isEditCouponModalOpen } = useAdminCouponStateFetch();
  const { deleteCouponAction } = useAdminCouponActionControl();

  const {
    isDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
    switchDeleteModalOpen,
  } = useDeleteModalControl();

  const onClickDeleteModalHandler = (target: AdminCouponDto) => {
    setDeleteTarget({ id: target.id, title: target.title });
    switchDeleteModalOpen();
  };

  return (
    <div className="admin-coupons">
      {isLoading && <Loading />}
      {isEditCouponModalOpen && <AdminCouponModal />}
      {isDeleteModalOpen && (
        <DeleteModal
          id={deleteTarget.id}
          title={deleteTarget.title}
          actionControl={{
            closeAction: switchDeleteModalOpen,
            deleteAction: deleteCouponAction,
          }}
        />
      )}
      <h3 className="admin-coupons__title">優惠券列表</h3>
      <AdminCouponTable onClickDeleteHandler={onClickDeleteModalHandler} />
    </div>
  );
};

export default AdminCoupons;
