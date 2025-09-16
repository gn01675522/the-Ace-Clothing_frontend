import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { setClearAdminProductState } from "../store/admin/adminProduct.slice";
import { fetchAdminProductAsync } from "../store/admin/adminProduct.asyncThunk";
import {
  selectAdminProductIsLoading,
  classifyAdminProducts,
  selectAdminProductEditModalIsOpen,
} from "../store/admin/adminProduct.selector";
import { selectUserSingleProduct } from "../store/client/userProduct.selector";

import { selectHasMessage } from "../../../store/message/message.selector";

export const useAdminProductStateFetch = (category: string | undefined) => {
  const productCategory = category ? category : "all";

  const products = useAppSelector(classifyAdminProducts(productCategory));
  const isLoading = useAppSelector(selectAdminProductIsLoading);
  const isProductEditModalOpen = useAppSelector(
    selectAdminProductEditModalIsOpen
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
    return () => {
      dispatch(setClearAdminProductState());
    };
  }, []);

  return { products, isLoading, isProductEditModalOpen };
};

export const useProductDetailPageStateFetch = () => {
  const { id } = useParams();

  const hasMessage = useAppSelector(selectHasMessage);
  const product = useAppSelector(selectUserSingleProduct);

  return { id, hasMessage, product };
};
