import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../store/redux-hooks";

import { selectUserFavorite } from "../../../../user/index";
import { getClientProductsByCategory } from "../../../helper/client-products.helper";

import type { UserProductsDto } from "../../../DTOs/userProduct.dtos";
import type { PRODUCT_CATEGORIES } from "../../../../../shared/types";

export const useProductPreviewListStateFetch = () => {
  const { category } = useParams();

  const wishlist = useAppSelector(selectUserFavorite);
  const products = useAppSelector(
    getClientProductsByCategory(category as PRODUCT_CATEGORIES)
  );

  //* selector 變動時則將 wishlist 內容放入 localStorage 裡面
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return { wishlist, category, products };
};

export const useChangePagination = (
  products: UserProductsDto[],
  category: PRODUCT_CATEGORIES
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  //* 一個頁面總共渲染 12 個 ProductCard，所以將所有資料除以 12 即可得到總共有幾頁
  const pageCount = Math.ceil(products.length / itemsPerPage);

  //* 根據頁面數量來做資料切割/
  const productsPerPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 12,
    currentPage * 12
  );

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  //* 若路由有改變則重新設定 setCurrentPage，不然切換路由時，currentPage 不會重置
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  return { productsPerPage, currentPage, pageCount, onChangePage };
};
