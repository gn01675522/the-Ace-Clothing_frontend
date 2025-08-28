import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { AdminTable } from "../../../../modules";

import {
  setCouponEditModalIsOpen,
  setCouponEditModalTargetData,
  setCouponEditModalType,
} from "../../store/adminCoupon.slice";
import { selectAdminCoupons } from "../../store/adminCoupon.selector";

import { adminCouponTableColumn } from "../../config/admin-coupon.config";
import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { FC } from "react";
import type { IGetAdminCoupon } from "../../DTOs/adminCoupon.dtos";

import "./AdminCouponTable.styles.scss";

type PropsType = {
  onClickDeleteHandler: (target: IGetAdminCoupon) => void;
};

export const AdminCouponTable: FC<PropsType> = ({ onClickDeleteHandler }) => {
  const coupons = useAppSelector(selectAdminCoupons);

  const dispatch = useAppDispatch();

  const onClickToCreateHandler = () => {
    dispatch(setCouponEditModalType(FORM_OPERATION_OPTIONS.create));
    dispatch(setCouponEditModalIsOpen(true));
  };

  const onClickToEditHandler = (coupon: IGetAdminCoupon) => {
    dispatch(setCouponEditModalType(FORM_OPERATION_OPTIONS.edit));
    dispatch(setCouponEditModalTargetData(coupon));
    dispatch(setCouponEditModalIsOpen(true));
  };

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
      <AdminTable<IGetAdminCoupon>
        data={coupons}
        columns={adminCouponTableColumn}
        onClickToDeleteHandler={onClickDeleteHandler}
        onClickToEditHandler={onClickToEditHandler}
      />
    </>
  );
};
