import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { useParams, Link } from "react-router-dom";

import OrderCard from "../../components/OrderCard/OrderCard.component";
import SummaryCard from "../../components/SummaryCard/SummaryCard.component";
import ProductCard from "../../components/ProductCard/ProductCard.component";

import {
  selectUserOrderProducts,
  selectUserOrderTotalPrice,
  selectUserSingleOrder,
} from "../../store/userOrder/userOrder.selector";

import { clearUserProduct } from "../../store/userProduct/userProduct.slice";

import { fetchUserProductAsync } from "../../store/userProduct/userProduct.asyncThunk";
import { selectRecommendProducts } from "../../store/userProduct/userProduct.selector";
import { selectUserFavorite } from "../../store/user/user.selector";

import { fetchCartItemsAsync } from "../../store/cart/cart.asyncThunk";
import { fetchUserSingleOrderAsync } from "../../store/userOrder/userOrder.asyncThunk";
import { setClearUserOrderState } from "../../store/userOrder/userOrder.slice";

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
        <SummaryCard total={totalPrice!} userData={userData!} />
        <div className="success__actions">
          <Link
            to="/"
            className="success__actions-home"
            onClick={clearOrderState}
          >
            返回首頁
          </Link>
        </div>
        <OrderCard products={products!} />
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
