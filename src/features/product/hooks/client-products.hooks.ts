import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";

import { clearUserProduct } from "../store/client/userProduct.slice";
import { fetchUserProductAsync } from "../store/client/userProduct.asyncThunk";
import { selectUserProductIsLoading } from "../store/client/userProduct.selector";
import { selectHasMessage } from "../../../store/message/message.selector";

export const useProductPageStateFetch = () => {
  const { category } = useParams();

  const dispatch = useAppDispatch();

  const hasMessage = useAppSelector(selectHasMessage);

  const isLoading = useAppSelector(selectUserProductIsLoading);

  useEffect(() => {
    dispatch(fetchUserProductAsync());
    return () => {
      dispatch(clearUserProduct());
    };
  }, []);

  return { category, hasMessage, isLoading };
};
