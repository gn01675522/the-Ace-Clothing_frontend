import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import { Pagination } from "../../features/navigation/index";
import { Button, BUTTON_TYPE_CLASS, Loading } from "../../components/index";
import { AdminTable } from "../../modules/index";
import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules/index";

import {
  CouponModal,
  fetchAdminCouponsAsync,
  selectAdminCoupons,
  selectAdminCouponsPagination,
  selectAdminCouponsIsLoading,
  type AdminCoupon,
} from "../../features/admin-coupon/index";

import { formatTimestampInMilliSeconds } from "../../utils/common.utils";

import type { FC, ReactNode } from "react";

import "./AdminCoupons.styles.scss";

const tableColumns: Array<{
  header: string;
  accessor: keyof AdminCoupon;
  render?: (value: AdminCoupon[keyof AdminCoupon]) => ReactNode;
}> = [
  { header: "優惠碼", accessor: "code" },
  { header: "折扣", accessor: "percent" },
  {
    header: "到期日",
    accessor: "due_date",
    render: (value) => formatTimestampInMilliSeconds(value),
  },
  { header: "啟用狀態", accessor: "is_enabled" },
];

const AdminCoupons: FC = () => {
  const [optionType, setOptionType] = useState<"create" | "edit">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetData, setTargetData] = useState<AdminCoupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState({ id: "", title: "" });

  const dispatch = useAppDispatch();

  const coupons = useAppSelector(selectAdminCoupons);
  const pagination = useAppSelector(selectAdminCouponsPagination);
  const isLoading = useAppSelector(selectAdminCouponsIsLoading);

  const onChangePageHandler = (page: number) => {
    dispatch(fetchAdminCouponsAsync(page));
  };

  const onClickToEditHandler = (product: AdminCoupon) => {
    setOptionType("edit");
    setTargetData(product);
    setIsModalOpen(!isModalOpen);
  };

  const onClickToCreateHandler = () => {
    setOptionType("create");
    setIsModalOpen(!isModalOpen);
  };

  const onClikIsDeleteModalOpen = (target: AdminCoupon) => {
    setDeleteTarget({ id: target.id, title: target.title });
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  useEffect(() => {
    dispatch(fetchAdminCouponsAsync());
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="admin-coupons">
        {isModalOpen && (
          <CouponModal
            createOrEdit={optionType}
            targetData={targetData}
            backdropClose={setIsModalOpen}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            dataType={DELETE_MODAL_TYPE.adminCoupon}
            id={deleteTarget.id}
            title={deleteTarget.title}
            closeAction={setIsDeleteModalOpen}
          />
        )}
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
        <AdminTable<AdminCoupon>
          data={coupons}
          columns={tableColumns}
          onClickToEditHandler={onClickToEditHandler}
          onClickToDeleteHandler={onClikIsDeleteModalOpen}
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

export default AdminCoupons;
