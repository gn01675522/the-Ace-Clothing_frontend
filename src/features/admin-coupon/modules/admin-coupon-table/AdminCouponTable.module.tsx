import { useAdminCouponContext } from "../../hooks/admin-coupon.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { AdminTable } from "../../../../modules";

import { adminCouponTableColumn } from "../../config/admin-coupon.config";
import { ADMIN_COUPON_FORM_CLASSES } from "../../types/admin-coupon.types";

import type { FC } from "react";
import type { IGetAdminCoupon } from "../../DTOs/adminCoupon.dtos";

type PropsType = {
  onClickDeleteModalHandler: (target: IGetAdminCoupon) => void;
};

export const AdminCouponTable: FC<PropsType> = ({
  onClickDeleteModalHandler,
}) => {
  const {
    formControl: { setCreateOrEdit, setTargetData },
    stateFetch: { coupons },
    modalControl: { switchModalOpen },
  } = useAdminCouponContext();

  const onClickToCreateHandler = () => {
    setCreateOrEdit(ADMIN_COUPON_FORM_CLASSES.create);
    switchModalOpen();
  };

  const onClickToEditHandler = (coupon: IGetAdminCoupon) => {
    setCreateOrEdit(ADMIN_COUPON_FORM_CLASSES.edit);
    setTargetData(coupon);
    switchModalOpen();
  };

  return (
    <>
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
    </>
  );
};
