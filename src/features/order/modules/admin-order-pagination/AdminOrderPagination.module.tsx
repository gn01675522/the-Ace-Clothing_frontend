import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { fetchAdminOrdersAsync } from "../../store/admin/adminOrder.asyncThunk";
import { selectAdminOrdersPagination } from "../../store/admin/adminOrder.selector";

import { Pagination } from "../../../../modules";

import type { FC } from "react";

import "./AdminOrderPagination.styles.scss";

export const AdminOrderPagination: FC = () => {
  const pagination = useAppSelector(selectAdminOrdersPagination);

  const dispatch = useAppDispatch();

  const onChangePageHandler = (page: number) => {
    dispatch(fetchAdminOrdersAsync(page));
  };
  return (
    <div className="admin-orders-pagination">
      <Pagination
        currentPage={pagination?.current_page || 1}
        onChangePage={onChangePageHandler}
        pageCount={pagination?.total_pages || 1}
      />
    </div>
  );
};
