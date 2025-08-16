import { CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";
import { Link } from "react-router-dom";

import WhiteHeartSVGIcon from "../../../../components/SVGIcons/WhiteHeartSVGIcon.component";
import RedHeartSVGIcon from "../../../../components/SVGIcons/RedHeartSVGIcon.component";
import PriceTag from "../../../../components/PriceTag/PriceTag.component";

import { setUserFavorite, selectUserFavorite } from "../../../user/index";

import type { FC, MouseEvent } from "react";

import "./ScrollItem.styles.scss";

type PropsType = {
  product: any;
  urlParam: string;
  isDragging: boolean;
  isFavorite: boolean;
  style: CSSProperties;
};

const ScrollItem: FC<PropsType> = ({
  product,
  urlParam,
  isDragging,
  isFavorite,
  style,
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
      className={`scroll-item scroll-item${isDragging ? "--dragging" : ""}`}
      draggable="false"
      style={style}
    >
      <div className="scroll-item__preview">
        <img
          src={imageUrl}
          className="scroll-item__preview-img"
          alt={`product in urlParam:${title}`}
        />
      </div>
      <div className="scroll-item__info">
        <h4 className="scroll-item__info-title">{title}</h4>
        <div
          className="scroll-item__info-wrapper"
          onClick={(e) =>
            isFavorite ? onRemoveFavorite(e, id) : onAddFavorite(e, id)
          }
        >
          {isFavorite ? (
            <RedHeartSVGIcon className="scroll-item__info-favorite" />
          ) : (
            <WhiteHeartSVGIcon className="scroll-item__info-favorite" />
          )}
        </div>
      </div>
      <div className="scroll-item__price">
        <PriceTag origin_price={origin_price} price={price} />
      </div>
    </Link>
  );
};

export default ScrollItem;
