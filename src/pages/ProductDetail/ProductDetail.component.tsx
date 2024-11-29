import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { useParams } from "react-router-dom";

import WhiteHeartSVGIcon from "../../components/SVGIcons/WhiteHeartSVGIcon.component";
import RedHeartSVGIcon from "../../components/SVGIcons/RedHeartSVGIcon.component";
import Message from "../../components/Message/Message.component";
import PriceTag from "../../components/PriceTag/PriceTag.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../components/Button/Button.component";

import { fetchUserSingleProductAsync } from "../../store/userProduct/userProduct.asyncThunk";
import { selectUserSingleProduct } from "../../store/userProduct/userProduct.selector";

import { selectHasMessage } from "../../store/message/message.selector";

import {
  setAddItemToCartAsync,
  fetchCartItemsAsync,
} from "../../store/cart/cart.asyncThunk";
import {
  selectCartIsLoading,
  selectCartItems,
} from "../../store/cart/cart.selector";

import { selectUserFavorite } from "../../store/user/user.selector";
import { setUserFavorite } from "../../store/user/user.slice";

import type { FC, MouseEvent } from "react";
import type { Product } from "../../store/userProduct/userProduct.types";

import "./ProductDetail.styles.scss";

const ProductDetail: FC = () => {
  const [imgWidth, setImgWidth] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const hasMessage = useAppSelector(selectHasMessage);
  const isLoading = useAppSelector(selectCartIsLoading);
  const product = useAppSelector(selectUserSingleProduct);
  const cartItems = useAppSelector(selectCartItems);
  const wishlist = useAppSelector(selectUserFavorite);

  const imgPreviewRef = useRef<HTMLUListElement>(null);
  const imgContainerRef = useRef<HTMLLIElement>(null);

  const isFavorite = wishlist.includes(id!);

  //* 尋找購物車內相同產品
  const productInCart =
    cartItems?.carts?.find((item) => item.product_id === id) || null;

  //* 根據 productInCart 的數量來進行顧客購買最大數量的設定
  const remainingQuantity = 5 - (productInCart?.qty || 0);

  //* 折扣數字，只取整數，小數點無條件捨去
  const discountRate = Math.trunc(
    (1 - product?.price! / product?.origin_price!) * 100
  );

  //* 直接將主圖片以及次要圖片組合成一個陣列，方便後續渲染 jsx；如果 imagesUrl 沒有圖片的話，就改成空陣列
  const pictureSet = [
    product?.imageUrl,
    ...(Array.isArray(product?.imagesUrl) ? product?.imagesUrl : []),
  ];

  //* 以 ul 為目標，如果按鈕回傳的為 prev，那麼就減少 imgWidth，讓圖片由右往左，反之。
  const onChangeImg = (type: "prev" | "next") => {
    const previewContainer = imgPreviewRef.current;
    if (previewContainer) {
      previewContainer.scrollLeft += type === "prev" ? -imgWidth : imgWidth;
    }
  };

  const onChangeQuantity = (type: "add" | "minor") => {
    setItemQuantity((pre) =>
      type === "add"
        ? pre >= remainingQuantity
          ? pre
          : pre + 1
        : pre === 1
        ? pre
        : pre - 1
    );
  };

  const addToCart = () => {
    const productData = {
      data: {
        product_id: id!,
        qty: itemQuantity,
      },
    };

    dispatch(setAddItemToCartAsync(productData));
  };

  const onAddFavorite = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const newList = [...wishlist, id] as string[];
    dispatch(setUserFavorite(newList));
  };

  const onRemoveFavorite = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const removeFavorite = wishlist.filter((item) => item !== id);
    dispatch(setUserFavorite(removeFavorite));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchUserSingleProductAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  //* 防止組件剛掛載 product 並無法馬上取得資料導致 DOM 抓不到的問題；
  //* 以及解決 imgWidth 只會抓取第一次組件 mount 時的寬度，而不會隨著螢幕尺寸改變的問題
  useEffect(() => {
    const detectResize = () => {
      const imgInitialWidth = imgContainerRef.current?.clientWidth;
      if (imgInitialWidth) {
        setImgWidth(imgInitialWidth);
      }
    };
    //* 偵測螢幕寬度，並儲存起來
    detectResize();

    window.addEventListener("resize", detectResize);
    //* cleanup 函式
    return () => {
      window.removeEventListener("resize", detectResize);
    };
  }, []);

  return (
    <div className="product-detail">
      {hasMessage && <Message />}
      <div className="product-detail__sale">
        <div className="product-detail__sale-wrapper">
          <ul className="product-detail__sale-preview" ref={imgPreviewRef}>
            {pictureSet?.map((img, i) => (
              <li
                className="product-detail__sale-preview-item"
                ref={imgContainerRef}
                key={i}
              >
                <img src={img} alt={`${product?.title} ${i + 1}`} />
              </li>
            ))}
          </ul>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectWhiteOpacityLSm}
            onClick={() => onChangeImg("prev")}
          />
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectWhiteOpacityRSm}
            onClick={() => onChangeImg("next")}
          />
        </div>

        <div className="product-detail__sale-info">
          <div className="product-detail__sale-info-content">
            <div className="product-detail__sale-info-conent-title-set">
              <h3 className="product-detail__sale-info-content-subtitle">
                the Ace Clothing
              </h3>
              <h1 className="product-detail__sale-info-content-title">
                {product?.title}
              </h1>
            </div>
            <div className="product-detail__sale-info-content-price">
              {product?.origin_price! > product?.price! && (
                <p className="product-detail__sale-info-content-price-sell">
                  {discountRate + "% off"}
                </p>
              )}
              <div className="product-detail__sale-info-content-price-area">
                <PriceTag
                  origin_price={product?.origin_price!}
                  price={product?.price!}
                />
              </div>
            </div>
          </div>
          <div className="product-detail__description">
            <div className="product-detail__description-content">
              {product?.content}
            </div>
            <div className="product-detail__description-material">
              <div className="product-detail__description-material-header">
                <h2 className="product-detail__description-material-header-title">
                  詳細資料
                </h2>
              </div>
              <ul className="product-detail__description-info">
                {product?.description?.split("-").map((item: string) => (
                  <li
                    key={item}
                    className="product-detail__description-info-item"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-detail__sale-function">
            {(itemQuantity === remainingQuantity ||
              remainingQuantity === 0) && (
              <span className="product-detail__sale-function-alert">
                {itemQuantity === 5
                  ? "* 購買上限為 5 件"
                  : `* 購物車內已有${productInCart?.qty}件，上限為 5 件`}
              </span>
            )}
            <div className="product-detail__sale-function-quantity">
              <Button
                buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
                onClick={() => onChangeQuantity("minor")}
                disabled={itemQuantity === 1}
              >
                -
              </Button>
              <input
                className="product-detail__sale-function-entry"
                type="number"
                value={itemQuantity}
                readOnly
              />
              <Button
                buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
                onClick={() => onChangeQuantity("add")}
                disabled={itemQuantity === 5 || remainingQuantity === 0}
              >
                +
              </Button>
            </div>

            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteBdLg}
              onClick={() => addToCart()}
              disabled={isLoading || remainingQuantity === 0}
            >
              {remainingQuantity === 0 ? "已達購買上限" : "加入購物車"}
            </Button>
            <div
              className="product-detail__sale-function-wrapper"
              onClick={(e) =>
                isFavorite ? onRemoveFavorite(e) : onAddFavorite(e)
              }
            >
              {isFavorite ? (
                <RedHeartSVGIcon className="product-detail__sale-function-favorite" />
              ) : (
                <WhiteHeartSVGIcon className="product-detail__sale-function-favorite" />
              )}
              <p>加入收藏清單</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
