import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";
import { Link } from "react-router-dom";

import {
  PriceTag,
  WhiteHeartSVGIcon,
  RedHeartSVGIcon,
} from "../../../../components/index";

import { setUserFavorite, selectUserFavorite } from "../../../user/index";

import type { FC, MouseEvent } from "react";

import "./ProductCardMini.styles.scss";

type PropsType = {
  product: any;
  urlParam: string;
  isDragging: boolean;
  isFavorite: boolean;
};

export const ProductCardMini: FC<PropsType> = ({
  product,
  urlParam,
  isDragging,
  isFavorite,
}) => {
  const wishlist = useAppSelector(selectUserFavorite);
  const { id, title, imageUrl, origin_price, price } = product;
  const dispatch = useAppDispatch();

  const onAddFavorite = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const newList = [...wishlist, id];
    dispatch(setUserFavorite(newList));
  };

  const onRemoveFavorite = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const removeFavorite = wishlist.filter((item) => item !== id);
    dispatch(setUserFavorite(removeFavorite));
  };

  return (
    <Link
      to={`/${urlParam}/${id}`}
      className={`product-card-mini product-card-mini${
        isDragging ? "--dragging" : ""
      }`}
      draggable="false"
    >
      <div className="product-card-mini__preview">
        <img
          src={imageUrl}
          className="product-card-mini__preview-img"
          alt={`product in urlParam:${title}`}
        />
      </div>
      <div className="product-card-mini__info">
        <h4 className="product-card-mini__info-title">{title}</h4>
        <div
          className="product-card-mini__info-wrapper"
          onClick={(e) =>
            isFavorite ? onRemoveFavorite(e, id) : onAddFavorite(e, id)
          }
        >
          {isFavorite ? (
            <RedHeartSVGIcon className="product-card-mini__info-favorite" />
          ) : (
            <WhiteHeartSVGIcon className="product-card-mini__info-favorite" />
          )}
        </div>
      </div>
      <div className="product-card-mini__price">
        <PriceTag origin_price={origin_price} price={price} />
      </div>
    </Link>
  );
};
