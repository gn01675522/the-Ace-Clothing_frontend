import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import OrderDetails from "./components/OrderDetail/OrderDetails.component";
import Wishlist from "./components/Wishlist/Wishlist.component";
import { Button, BUTTON_TYPE_CLASS } from "../../components/index";

import { fetchUserOrdersAsync } from "../../store/userOrder/userOrder.asyncThunk";
import { fetchUserProductAsync } from "../../features/product/store/client/userProduct.asyncThunk";
import { setUserFavorite } from "../../store/user/user.slice";

import { selectUserProducts } from "../../features/product/index";
import { selectUserFavorite } from "../../store/user/user.selector";

import type { FC, FormEvent, ChangeEvent } from "react";
import type { Product } from "../../features/product/DTOs/userProduct.types";

import "./Member.styles.scss";

const options = [
  { id: 1, title: "願望清單", route: "/member/wishlist" },
  { id: 2, title: "我的訂單", route: "/member/order-detail" },
];

const Member: FC = () => {
  const [email, setEmail] = useState("");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();
  const routeParams = useParams();

  const wishlistInLocalStorage = useAppSelector(selectUserFavorite);
  const products = useAppSelector(selectUserProducts);

  const wishlist = wishlistInLocalStorage.reduce((acc, item) => {
    const product = products.find((product) => product.id === item);
    if (product) {
      acc.push(product);
    }
    return acc;
  }, [] as Product[]);

  const onSearchOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail(inputValue);
  };

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onRemoveFavorite = (id: string) => {
    const removeFavorite = wishlistInLocalStorage.filter((item) => item !== id);
    dispatch(setUserFavorite(removeFavorite));
  };

  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
    dispatch(fetchUserProductAsync());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistInLocalStorage));
  }, [wishlistInLocalStorage]);

  return (
    <div className="member">
      <h1 className="member__title">客戶資訊</h1>
      {routeParams.option === "order-detail" && (
        <form className="member__function" onSubmit={onSearchOrder}>
          <input
            placeholder="請輸入電子信箱"
            type="search"
            onChange={onChangeInputValue}
          />
          <Button
            type="submit"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            disabled={!inputValue}
          >
            查詢
          </Button>
        </form>
      )}
      <div className="member__tab">
        <div className="member__tab-nav">
          {options.map((option, i) => (
            <NavLink
              to={option.route}
              className={`member__tab-nav-item${
                i === options.length - 1 ? " member__tab-nav-item-last" : ""
              }`}
              key={option.id}
            >
              {option.title}
            </NavLink>
          ))}
        </div>
        <div className="member__tab-content">
          {routeParams.option === "order-detail" ? (
            <OrderDetails email={email} />
          ) : (
            <Wishlist
              wishlist={wishlist}
              onClickToRemoveFavorite={onRemoveFavorite}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
