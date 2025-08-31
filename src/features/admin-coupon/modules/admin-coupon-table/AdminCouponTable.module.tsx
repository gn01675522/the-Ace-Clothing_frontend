import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { AdminTable } from "../../../../modules";

import { setCouponEditModalOpenAndSetting } from "../../store/adminCoupon.slice";
import { selectAdminCoupons } from "../../store/adminCoupon.selector";

import { adminCouponTableColumn } from "./config/admin-coupon-table.config";
import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { FC } from "react";
import type { AdminCouponDto } from "../../DTOs/adminCoupon.dtos";

import "./AdminCouponTable.styles.scss";

type PropsType = {
  onClickDeleteHandler: (target: AdminCouponDto) => void;
};

export const AdminCouponTable: FC<PropsType> = ({ onClickDeleteHandler }) => {
  const coupons = useAppSelector(selectAdminCoupons);

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
      <AdminTable<AdminCouponDto>
        data={coupons}
        columns={adminCouponTableColumn}
        onClickToDeleteHandler={onClickDeleteHandler}
        onClickToEditHandler={onClickToEditHandler}
      />
    </>
  );
};
