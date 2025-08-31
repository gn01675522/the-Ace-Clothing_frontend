import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules/index";
import { useDeleteModalControl } from "../../modules/index";

import { useAdminCouponStateFetch } from "../../features/admin-coupon/index";

import { Loading } from "../../components/index";

import {
  AdminCouponTable,
  AdminCouponPagination,
  AdminCouponModal,
  type AdminCouponDto,
} from "../../features/admin-coupon/index";

import type { FC } from "react";

import "./AdminCoupons.styles.scss";

const AdminCoupons: FC = () => {
  const { isLoading } = useAdminCouponStateFetch();

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
      <AdminCouponModal />
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminCoupon}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <h3 className="admin-coupons__title">優惠券列表</h3>
      <AdminCouponTable onClickDeleteHandler={onClickDeleteModalHandler} />
      <AdminCouponPagination />
    </div>
  );
};

export default AdminCoupons;
