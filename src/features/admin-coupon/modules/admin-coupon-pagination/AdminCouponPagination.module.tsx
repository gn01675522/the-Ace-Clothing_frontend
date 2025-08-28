import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Pagination } from "../../../../modules";

import { fetchAdminCouponsAsync } from "../../store/adminCoupon.asyncThunk";
import { selectAdminCouponsPagination } from "../../store/adminCoupon.selector";

import type { FC } from "react";

import "./AdminCouponPagination.styles.scss";

export const AdminCouponPagination: FC = () => {
  const pagination = useAppSelector(selectAdminCouponsPagination);

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
