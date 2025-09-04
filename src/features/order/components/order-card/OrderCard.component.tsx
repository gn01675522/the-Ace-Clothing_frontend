import { formatNumberWithCommas } from "../../../../utils/common.utils";

import type { FC } from "react";

import "./OrderCard.styles.scss";

type PropsType = {
  imageUrl: string;
  title: string;
  qty: number;
  final_total: number;
};

export const OrderCard: FC<PropsType> = ({
  imageUrl,
  title,
  qty,
  final_total,
}) => {
  return (
    <div className="order-card">
      <img
        src={imageUrl}
        className="order-card__img"
        alt={`order product: ${title}`}
      />
      <div className="order-card__info">
        <div className="d-flex justify-content-between fw-bold">
          <p className="mb-0">
            {title} x {qty}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="mb-0">
            NT$ {formatNumberWithCommas(Math.round(final_total))}
          </p>
        </div>
      </div>
    </div>
  );
};
