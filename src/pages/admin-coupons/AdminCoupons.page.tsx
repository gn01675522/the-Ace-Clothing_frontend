import { useAppDispatch } from "../../store/redux-hooks";
import {
  AdminCouponContextProvider,
  useAdminCouponContext,
} from "../../features/admin-coupon/index";

import { AdminTable, Pagination } from "../../modules/index";
import { Button, BUTTON_TYPE_CLASS, Loading } from "../../components/index";
import {
  DeleteModal,
  DELETE_MODAL_TYPE,
  useDeleteModalControl,
} from "../../modules/index";

import {
  CouponModal,
  fetchAdminCouponsAsync,
  ADMIN_COUPON_FORM_CLASSES,
  adminCouponTableColumn,
  type IGetAdminCoupon,
} from "../../features/admin-coupon/index";

import type { FC } from "react";

import "./AdminCoupons.styles.scss";

const AdminCouponsContent: FC = () => {
  const {
    formControl: { setCreateOrEdit, setTargetData },
    modalControl: { switchModalOpen, isModalOpen },
    stateFetch: { coupons, pagination, isLoading },
  } = useAdminCouponContext();
  const {
    isDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
    switchDeleteModalOpen,
  } = useDeleteModalControl();

  const dispatch = useAppDispatch();

  const onChangePageHandler = (page: number) =>
    dispatch(fetchAdminCouponsAsync(page));

  const onClickDeleteModalHandler = (target: IGetAdminCoupon) => {
    setDeleteTarget({ id: target.id, title: target.title });
    switchDeleteModalOpen();
  };

  const onClickToEditHandler = (coupon: IGetAdminCoupon) => {
    setCreateOrEdit(ADMIN_COUPON_FORM_CLASSES.edit);
    setTargetData(coupon);
    switchModalOpen();
  };

  const onClickToCreateHandler = () => {
    setCreateOrEdit(ADMIN_COUPON_FORM_CLASSES.create);
    switchModalOpen();
  };

  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && <CouponModal />}
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

        <div className="admin-coupons__content">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
            onClick={onClickToCreateHandler}
          >
            建立新優惠券
          </Button>
        </div>
        <AdminTable<IGetAdminCoupon>
          data={coupons}
          columns={adminCouponTableColumn}
          onClickToDeleteHandler={onClickDeleteModalHandler}
          onClickToEditHandler={onClickToEditHandler}
        />
        <div className="admin-coupons__function">
          <Pagination
            currentPage={pagination?.current_page || 1}
            onChangePage={onChangePageHandler}
            pageCount={pagination?.total_pages || 1}
          />
        </div>
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
