import { createContext } from "react";
import { useAppDispatch } from "../../../../../store/redux-hooks";

import {
  useAdminProductEditModalControl,
  useAdminProductModalFormControl,
  useAdminProductEditModalStateFetch,
} from "../hooks/admin-product-modal.hooks";

import { setClearProductEditModalControl } from "../../../store/admin/adminProduct.slice";

import { defaultProdcutFormStructure } from "../config/admin-product-modal.config";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminProductEditModalControl>;
  formControl: ReturnType<typeof useAdminProductModalFormControl>;
  stateFetch: ReturnType<typeof useAdminProductEditModalStateFetch>;
  onCloseHandler: () => void;
  onSubmitHandler: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const ProductManagementContext = createContext<ContextType | null>(null);

export const ProductManagementContextProvider = ({
  children,
}: ContextPropsType) => {
  const formControl = useAdminProductModalFormControl();
  const modalControl = useAdminProductEditModalControl();
  const stateFetch = useAdminProductEditModalStateFetch();

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    modalControl.switchModalOpen();
    formControl.setFormData({ id: null, form: defaultProdcutFormStructure });
    dispatch(setClearProductEditModalControl());
  };

  const onSubmitHandler = () => {
    formControl.submitForm();
    modalControl.switchModalOpen();
    dispatch(setClearProductEditModalControl());
  };

  const value = {
    formControl,
    modalControl,
    stateFetch,
    onCloseHandler,
    onSubmitHandler,
  };

  return (
    <ProductManagementContext.Provider value={value}>
      {children}
    </ProductManagementContext.Provider>
  );
};
