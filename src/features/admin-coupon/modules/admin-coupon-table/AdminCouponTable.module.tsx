import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { DataTable } from "../../../../modules";

import { setCouponEditModalOpenAndSetting } from "../../store/admin-coupon.slice";
import { fetchAdminCouponsAsync } from "../../store/admin-coupon.asyncThunk";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
} from "../../store/admin-coupon.selector";

import { adminCouponTableConfig } from "./config/admin-coupon-table.config";
import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { FC } from "react";
import type { AdminCouponDto } from "../../DTOs/adminCoupon.dtos";

import "./AdminCouponTable.styles.scss";

type PropsType = {
  onClickDeleteHandler: (target: AdminCouponDto) => void;
};

export const AdminCouponTable: FC<PropsType> = ({ onClickDeleteHandler }) => {
  const coupons = useAppSelector(selectAdminCoupons);
  const pagination = useAppSelector(selectAdminCouponsPagination);

  const dispatch = useAppDispatch();

  const onClickToCreateHandler = () =>
    dispatch(
      setCouponEditModalOpenAndSetting({
        type: FORM_OPERATION_OPTIONS.create,
        targetData: null,
      })
    );

  const onClickToEditHandler = (coupon: AdminCouponDto) =>
    dispatch(
      setCouponEditModalOpenAndSetting({
        type: FORM_OPERATION_OPTIONS.edit,
        targetData: coupon,
      })
    );

  const paginationAction = {
    currentPage: pagination?.current_page || 1,
    pageCount: pagination?.total_pages || 1,
    onChangePage: (page: number) => dispatch(fetchAdminCouponsAsync(page)),
  };

  const tableConfig = adminCouponTableConfig({
    couponData: coupons,
    onClickToEditHandler,
    onClickToDeleteHandler: onClickDeleteHandler,
  });

  return (
    <>
      <div className="admin-coupon-table-content">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
          onClick={onClickToCreateHandler}
        >
          建立新優惠券
        </Button>
      </div>
      <DataTable
        config={tableConfig}
        actionControl={{ pagination: paginationAction }}
      />
    </>
  );
};
