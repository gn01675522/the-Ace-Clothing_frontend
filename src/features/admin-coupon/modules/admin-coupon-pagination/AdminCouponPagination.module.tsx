import { useAppDispatch } from "../../../../store/redux-hooks";
import { useAdminCouponContext } from "../../hooks/admin-coupon.hooks";

import { Pagination } from "../../../../modules";

import { fetchAdminCouponsAsync } from "../../store/adminCoupon.asyncThunk";

import type { FC } from "react";

import "./AdminCouponPagination.styles.scss";

export const AdminCouponPagination: FC = () => {
  const {
    stateFetch: { pagination },
  } = useAdminCouponContext();

  const dispatch = useAppDispatch();

  const onChangePageHandler = (page: number) =>
    dispatch(fetchAdminCouponsAsync(page));

  return (
    <div className="admin-coupons-pagination">
      <Pagination
        currentPage={pagination?.current_page || 1}
        onChangePage={onChangePageHandler}
        pageCount={pagination?.total_pages || 1}
      />
    </div>
  );
};
