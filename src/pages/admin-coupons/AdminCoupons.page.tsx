import { AdminCouponContextProvider } from "../../features/admin-coupon/index";

import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules/index";
import { useDeleteModalControl } from "../../modules/index";

import {
  AdminCouponOverlay,
  AdminCouponTable,
  AdminCouponPagination,
  type IGetAdminCoupon,
} from "../../features/admin-coupon/index";

import type { FC } from "react";

import "./AdminCoupons.styles.scss";

const AdminCouponsContent: FC = () => {
  const {
    isDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
    switchDeleteModalOpen,
  } = useDeleteModalControl();

  const onClickDeleteModalHandler = (target: IGetAdminCoupon) => {
    setDeleteTarget({ id: target.id, title: target.title });
    switchDeleteModalOpen();
  };

  return (
    <>
      <AdminCouponOverlay />
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminCoupon}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <div className="admin-coupons">
        <h3 className="admin-coupons__title">優惠券列表</h3>
        <AdminCouponTable
          onClickDeleteModalHandler={onClickDeleteModalHandler}
        />
        <AdminCouponPagination />
      </div>
    </>
  );
};

const AdminCoupons: FC = () => {
  return (
    <AdminCouponContextProvider>
      <AdminCouponsContent />
    </AdminCouponContextProvider>
  );
};

export default AdminCoupons;
