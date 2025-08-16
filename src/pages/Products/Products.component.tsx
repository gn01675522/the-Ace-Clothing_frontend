import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import { Pagination } from "../../features/navigation/index";
import Loading from "../../components/Loading/Loading.component";
import ProductCard from "../../components/ProductCard/ProductCard.component";
import Message from "../../components/Message/Message.component";

import { clearUserProduct } from "../../store/userProduct/userProduct.slice";
import { fetchUserProductAsync } from "../../store/userProduct/userProduct.asyncThunk";

import {
  selectUserProductIsLoading,
  selectUserProducts,
  selectUserMensProducts,
  selectUserWomensProducts,
  selectUserHatsProducts,
  selectUserShoesProducts,
  selectUserAccessoriesProducts,
  selectUrbanProducts,
  selectBohemianProducts,
} from "../../store/userProduct/userProduct.selector";

import { selectUserFavorite } from "../../store/user/user.selector";

import { selectHasMessage } from "../../store/message/message.selector";
import { PRODUCT_CATEGORIES } from "../../shared/types";

import type { FC } from "react";

import "./Products.styles.scss";

//* 根據傳入 category 來決定 return 哪個 selector
const getProducts = (category: PRODUCT_CATEGORIES) =>
  ({
    [PRODUCT_CATEGORIES.all]: selectUserProducts,
    [PRODUCT_CATEGORIES.mens]: selectUserMensProducts,
    [PRODUCT_CATEGORIES.womens]: selectUserWomensProducts,
    [PRODUCT_CATEGORIES.hats]: selectUserHatsProducts,
    [PRODUCT_CATEGORIES.shoes]: selectUserShoesProducts,
    [PRODUCT_CATEGORIES.accessories]: selectUserAccessoriesProducts,
    [PRODUCT_CATEGORIES.urban]: selectUrbanProducts,
    [PRODUCT_CATEGORIES.bohemian]: selectBohemianProducts,
  }[category]);

const Products: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();

  const { category } = useParams();

  const products = useAppSelector(getProducts(category as PRODUCT_CATEGORIES));
  const hasMessage = useAppSelector(selectHasMessage);
  const wishlist = useAppSelector(selectUserFavorite);
  const isLoading = useAppSelector(selectUserProductIsLoading);

  const pageTitle =
    category === "mens"
      ? "男裝"
      : category === "womens"
      ? "女裝"
      : category === "shoes"
      ? "鞋子"
      : category === "hats"
      ? "帽子"
      : category === "bohemian"
      ? "bohemian"
      : category === "urban"
      ? "urban"
      : "飾品";

  //* 一個頁面總共渲染 12 個 ProductCard，所以將所有資料除以 12 即可得到總共有幾頁
  const pageCount = Math.ceil(products.length / 12);

  //* 根據頁面數量來做資料切割/
  const productsInPage = useMemo(() => {
    return products.slice(
      currentPage === 1 ? 0 : (currentPage - 1) * 12,
      currentPage * 12
    );
  }, [products, currentPage]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  //* 結束時清空 redux，不然會有洩漏問題
  useEffect(() => {
    dispatch(fetchUserProductAsync());
    return () => {
      dispatch(clearUserProduct());
    };
  }, [dispatch]);

  //* 若路由有改變則重新設定 setCurrentPage，不然切換路由時，currentPage 不會重置
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  //* selector 變動時則將 wishlist 內容放入 localStorage 裡面
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="products">
      {hasMessage && <Message />}
      {isLoading && <Loading />}
      <h1 className="products__title">{pageTitle}</h1>
      <div className="products__content">
        {productsInPage.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              urlParam={category as PRODUCT_CATEGORIES}
              isFavorite={wishlist.includes(product.id)}
            />
          );
        })}
      </div>
      <nav className="products__function">
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          pageCount={pageCount}
        />
      </nav>
    </div>
  );
};

export default Products;
