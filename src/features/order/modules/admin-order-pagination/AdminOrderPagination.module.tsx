import { useAppDispatch } from "../../../../store/redux-hooks";

import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { fetchAdminOrdersAsync } from "../../store/admin/adminOrder.asyncThunk";

import { Pagination } from "../../../../modules";

import type { FC } from "react";

import "./AdminOrderPagination.styles.scss";

export const AdminOrderPagination: FC = ({}) => {
  const {
    stateFetch: { pagination },
  } = useAdminOrderContext();

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
