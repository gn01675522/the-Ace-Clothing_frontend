import { useState } from "react";

import { useAdminProductsContext } from "../../hooks/adminProducts.hooks";

import { Pagination } from "../../../../modules";

import type { Dispatch, FC, SetStateAction } from "react";

type PropsType = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const AdminProductPagination: FC<PropsType> = ({
  currentPage,
  setCurrentPage,
}) => {
  const {
    stateFetch: { pageCount },
  } = useAdminProductsContext();

  //* 透過 api 取得切換頁面後的產品資料
  const onChangePage = (page: number) => setCurrentPage(page);

  return (
    <div className="admin-products__function">
      <Pagination
        onChangePage={onChangePage}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </div>
  );
};
