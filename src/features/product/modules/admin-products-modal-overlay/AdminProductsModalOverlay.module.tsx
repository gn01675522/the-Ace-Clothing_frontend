import { useAdminProductsContext } from "../../hooks/adminProducts.hooks";

import { Loading } from "../../../../components";
import { ProductModal } from "../product-modal/ProductModal.module";

import type { FC } from "react";

export const AdminProductsModalOverlay: FC = () => {
  const {
    modalControl: { isModalOpen },
    stateFetch: { isLoading },
  } = useAdminProductsContext();
  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && <ProductModal />}
    </>
  );
};
