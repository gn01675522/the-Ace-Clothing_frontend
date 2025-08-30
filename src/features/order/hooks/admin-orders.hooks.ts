import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { setClearAdminOrderState } from "../store/admin/adminOrder.slice";
import { fetchAdminOrdersAsync } from "../store/admin/adminOrder.asyncThunk";
import {
  selectAdminOrdersIsLoading,
  selectAdminOrders,
  selectAdminOrdersPagination,
} from "../store/admin/adminOrder.selector";

export const useAdminOrderStateFetch = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectAdminOrders);
  const pagination = useAppSelector(selectAdminOrdersPagination);
  const isLoading = useAppSelector(selectAdminOrdersIsLoading);

  useEffect(() => {
    dispatch(fetchAdminOrdersAsync());
    return () => {
      dispatch(setClearAdminOrderState());
    };
  }, []);

  return { orders, pagination, isLoading };
};
