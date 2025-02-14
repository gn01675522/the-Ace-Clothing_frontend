import { formatNumberWithCommas } from "../../utils/common.utils";

import type { FC } from "react";
import type { Product } from "store/userProduct/userProduct.types";
import type { AdminCoupon } from "store/adminCoupon/adminCoupon.types";

import "./OrderCard.styles.scss";

export type OrderCardProductsType = {
  id: string;
  product_id: string;
  qty: number;
  coupon: AdminCoupon;
  final_total: number;
  product: Product;
  total: number;
};

type PropsType = {
  products: OrderCardProductsType[];
};

const OrderCard: FC<PropsType> = ({ products }) => {
  return (
    <div className="order-card">
      <input
        className="order-card__input"
        id="order-card__trigger"
        type="checkbox"
      />
      <label htmlFor="order-card__trigger" className="order-card__toggle">
        <div className="order-card__toggle-triangle"></div>
        <h2 className="order-card__toggle-title">訂單內容</h2>
      </label>
      <div className="order-card__content">
        {products?.map((item) => {
          return (
            <div className="order-card__item" key={item.id}>
              <img
                src={item.product.imageUrl}
                className="order-card__item-img"
                alt={`order product: ${item.product.title}`}
              />
              <div className="order-card__item-info">
                <div className="d-flex justify-content-between fw-bold">
                  <p className="mb-0">
                    {item.product.title}x{item.qty}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">
                    NT$ {formatNumberWithCommas(Math.round(item.final_total))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
