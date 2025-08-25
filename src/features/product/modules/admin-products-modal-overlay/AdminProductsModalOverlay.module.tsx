import { useAdminProductsContext } from "../../hooks/admin-products.hooks";

import { Loading } from "../../../../components";
import { AdminProductModal } from "../product-modal/AdminProductModal.module";

import type { FC } from "react";

export const AdminProductsModalOverlay: FC = () => {
  const {
    modalControl: { isModalOpen },
    stateFetch: { isLoading },
  } = useAdminProductsContext();
  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && <AdminProductModal />}
    </>
  );
};
