import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { setClearAdminProductState } from "../store/admin/adminProduct.slice";
import { fetchAdminProductAsync } from "../store/admin/adminProduct.asyncThunk";
import {
  selectAdminProductIsLoading,
  classifyAdminProducts,
} from "../store/admin/adminProduct.selector";

export const useAdminProductStateFetch = (category: string | undefined) => {
  const productCategory = category ? category : "all";

  const products = useAppSelector(classifyAdminProducts(productCategory));
  const isLoading = useAppSelector(selectAdminProductIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
    return () => {
      dispatch(setClearAdminProductState());
    };
  }, []);

  return { products, isLoading };
};
