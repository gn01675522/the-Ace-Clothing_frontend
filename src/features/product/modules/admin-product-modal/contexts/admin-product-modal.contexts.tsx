import { createContext } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/redux-hooks";

import {
  useAdminProductEditModalControl,
  useAdminProductModalFormControl,
} from "../hooks/admin-product-modal.hooks";

import { setClearProductEditModalControl } from "../../../store/admin/adminProduct.slice";

import { defaultProdcutFormStructure } from "../config/admin-product-modal.config";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminProductEditModalControl>;
  formControl: ReturnType<typeof useAdminProductModalFormControl>;
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
  const { category } = useParams();
  const formControl = useAdminProductModalFormControl(category);
  const modalControl = useAdminProductEditModalControl();

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    modalControl.switchModalOpen();
    formControl.setFormData({ id: null, form: defaultProdcutFormStructure });
    dispatch(setClearProductEditModalControl());
  };

  const onSubmitHandler = () => {};

  const value = {
    formControl,
    modalControl,
    onCloseHandler,
    onSubmitHandler,
  };

  return (
    <ProductManagementContext.Provider value={value}>
      {children}
    </ProductManagementContext.Provider>
  );
};
