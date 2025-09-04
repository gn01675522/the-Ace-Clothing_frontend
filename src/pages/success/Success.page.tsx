import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { useParams, Link } from "react-router-dom";

import { OrderCard, SummaryCard } from "../../features/order/index";
import { ToggleList } from "../../components/index";

import { ProductCard } from "../../features/product/index";

import {
  selectUserOrderProducts,
  selectUserOrderTotalPrice,
  selectUserSingleOrder,
  fetchUserSingleOrderAsync,
} from "../../features/order/index";

import {
  clearUserProduct,
  selectRecommendProducts,
} from "../../features/product/index";

import { fetchUserProductAsync } from "../../features/product/store/client/userProduct.asyncThunk";
import { selectUserFavorite } from "../../features/user/index";

import { fetchCartItemsAsync } from "../../features/cart/index";
import { setClearUserOrderState } from "../../features/order/store/client/userOrder.slice";

import type { FC } from "react";
import type { PRODUCT_CATEGORIES } from "../../shared/types";

import "./Success.styles.scss";

const Success: FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectUserOrderProducts);
  const totalPrice = useAppSelector(selectUserOrderTotalPrice);
  const userData = useAppSelector(selectUserSingleOrder);
  const wishlist = useAppSelector(selectUserFavorite);
  const recommendProducts = useAppSelector(selectRecommendProducts);

  const productInOrder = userData?.products || {};
  const productList = Object.values(productInOrder).map((item) => ({
    id: item.product.id,
    imageUrl: item.product.imageUrl,
    title: item.product.title,
    qty: item.qty,
    final_total: item.final_total,
  }));
  console.log(productList);

  const clearOrderState = () => {
    dispatch(setClearUserOrderState());
  };

  useEffect(() => {
    if (orderId) dispatch(fetchUserSingleOrderAsync(orderId));
    dispatch(fetchCartItemsAsync());
    dispatch(fetchUserProductAsync());

    return () => {
      dispatch(clearUserProduct());
    };
  }, [orderId, dispatch]);

  useEffect(() => {
    //* selector 變動時則將 wishlist 內容放入 localStorage 裡面
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="success">
      <div className="success__order-detail">
        <h1 className="success__order-detail-title">訂購完成</h1>
        <SummaryCard final_total={totalPrice!} userData={userData!} />
        <div className="success__actions">
          <Link
            to="/"
            className="success__actions-home"
            onClick={clearOrderState}
          >
            返回首頁
          </Link>
        </div>
        <ToggleList title="訂單內容">
          {productList.map((product) => (
            <OrderCard key={product.id} {...product} />
          ))}
        </ToggleList>
      </div>
      <div className="success__recommend">
        <h2 className="success__recommend-title">您或許還想買</h2>
        <div className="success__recommend-card">
          {recommendProducts.map((product) => {
            const { category } = product;
            const productCategory = category.split("-")[0];
            return (
              <ProductCard
                product={product}
                urlParam={productCategory as PRODUCT_CATEGORIES}
                isFavorite={wishlist.includes(product.id)}
                key={product.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Success;
