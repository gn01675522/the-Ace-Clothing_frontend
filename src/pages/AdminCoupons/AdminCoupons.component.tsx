import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import Pagination from "../../components/Pagination/Pagination.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../components/Button/Button.component";
import CouponModal from "../../components/CouponModal/CouponModal.component";
import AdminTable from "../../components/AdminTable/AdminTable.component";
import DeleteModal, {
  DELETE_MODAL_TYPE,
} from "../../components/DeleteModal/DeleteModal.component";
import Loading from "../../components/Loading/Loading.component";

import { fetchAdminCouponsAsync } from "../../store/adminCoupon/adminCoupon.asyncThunk";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
  selectAdminCouponsIsLoading,
} from "../../store/adminCoupon/adminCoupon.selector";

import type { FC } from "react";
import type { AdminCoupon } from "../../store/adminCoupon/adminCoupon.types";

import "./AdminCoupons.styles.scss";

const tableColumns = [
  { header: "優惠碼", accessor: "code" },
  { header: "折扣", accessor: "percent" },
  { header: "到期日", accessor: "due_date" },
  { header: "啟用狀態", accessor: "is_enabled" },
] as { header: string; accessor: keyof AdminCoupon }[];

const AdminCoupons: FC = () => {
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit">("create");
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

  const openCouponModal = (type: "create" | "edit", product?: AdminCoupon) => {
    setCreateOrEdit(type);
    if (type === "edit") setTargetData(product!);
    setIsModalOpen(!isModalOpen);
  };

  const onClikIsDeleteModalOpen = (target?: AdminCoupon) => {
    if (target) setDeleteTarget({ id: target.id, title: target.title });
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
            createOrEdit={createOrEdit}
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
            onClick={() => openCouponModal("create")}
          >
            建立新優惠券
          </Button>
        </div>
        <AdminTable
          data={coupons}
          columns={tableColumns}
          onClickToEditHandler={openCouponModal}
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
