import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../store/redux-hooks";

import { Pagination } from "../../../../modules";

import { classifyAdminProducts } from "../../store/admin/adminProduct.selector";

import type { Dispatch, FC, SetStateAction } from "react";

import "./AdminProductPagination.styles.scss";

type PropsType = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const AdminProductPagination: FC<PropsType> = ({
  currentPage,
  setCurrentPage,
}) => {
  const { category } = useParams();
  const products = useAppSelector(classifyAdminProducts(category || ""));

  const pageCount = Math.ceil(products.length / 10);

  //* 透過 api 取得切換頁面後的產品資料
  const onChangePage = (page: number) => setCurrentPage(page);

  return (
    <div className="admin-products-pagination">
      <Pagination
        onChangePage={onChangePage}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </div>
  );
};
