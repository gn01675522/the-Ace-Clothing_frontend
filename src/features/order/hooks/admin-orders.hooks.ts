import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";

import { setClearAdminOrderState } from "../store/admin/adminOrder.slice";
import {
  fetchAdminOrdersAsync,
  deleteAdminOrdersAsync,
} from "../store/admin/adminOrder.asyncThunk";
import {
  selectAdminOrdersIsLoading,
  selectAdminOrders,
  selectAdminOrdersPagination,
  selectAdminOrderEditModalIsOpen,
} from "../store/admin/adminOrder.selector";

export const useAdminOrderStateFetch = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectAdminOrders);
  const pagination = useAppSelector(selectAdminOrdersPagination);
  const isLoading = useAppSelector(selectAdminOrdersIsLoading);
  const isOrderEditModalOpen = useAppSelector(selectAdminOrderEditModalIsOpen);

  useEffect(() => {
    dispatch(fetchAdminOrdersAsync());
    return () => {
      dispatch(setClearAdminOrderState());
    };
  }, []);

  return { orders, pagination, isLoading, isOrderEditModalOpen };
};

export const useAdminOrderActionControl = () => {
  const dispatch = useAppDispatch();

  const deleteOrderAction = (id: string) =>
    dispatch(deleteAdminOrdersAsync(id));

  return { deleteOrderAction };
};
