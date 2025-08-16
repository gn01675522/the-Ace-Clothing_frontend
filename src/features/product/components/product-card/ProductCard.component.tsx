import { useAppSelector, useAppDispatch } from "../../../../store/redux-hooks";
import { Link } from "react-router-dom";

import {
  PriceTag,
  WhiteHeartSVGIcon,
  RedHeartSVGIcon,
} from "../../../../components/index";

import { setUserFavorite, selectUserFavorite } from "../../../user/index";

import type { FC, MouseEvent } from "react";
import type { Product } from "../../DTOs/userProduct.types";
import type { PRODUCT_CATEGORIES } from "../../../../shared/types";

import "./ProductCard.styles.scss";

type PropsType = {
  product: Product;
  urlParam: PRODUCT_CATEGORIES;
  isFavorite: boolean;
};

const ProductCard: FC<PropsType> = ({ product, urlParam, isFavorite }) => {
  const dispatch = useAppDispatch();

  const wishlist = useAppSelector(selectUserFavorite);

  const { id, imageUrl, title, origin_price, price } = product;

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
    <Link to={`/${urlParam}/${id}`} className="products-card">
      <div className="products-card__preview">
        <img
          src={imageUrl}
          className="products-card__img"
          alt={`product in ${urlParam}: ${title}`}
        />
      </div>
      <div className="products-card__content">
        <div className="products-card__content-info">
          <h4 className="products-card__content-info-title">{title}</h4>
          <div
            className="products-card__content-info-wrapper"
            onClick={(e) =>
              isFavorite ? onRemoveFavorite(e, id) : onAddFavorite(e, id)
            }
          >
            {isFavorite ? (
              <RedHeartSVGIcon className="products-card__content-info-favorite" />
            ) : (
              <WhiteHeartSVGIcon className="products-card__content-info-favorite" />
            )}
          </div>
        </div>
        <div className="products-card__content-price">
          <PriceTag origin_price={origin_price} price={price} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
