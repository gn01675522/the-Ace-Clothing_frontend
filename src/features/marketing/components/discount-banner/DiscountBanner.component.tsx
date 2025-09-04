import type { FC } from "react";

import "./DiscountBanner.styles.scss";

export const DiscountBanner: FC = () => {
  return (
    <div className="discount-banner">
      <div className="discount-banner__content">
        <h3>Grand Opening Sale</h3>
        <h2>EXTRA 30% OFF SALE</h2>
        <p>
          慶祝您我的相遇，也歡迎您加入我們的旅程，輸入 newBeginning 即可享全品項
          7 折優惠！
        </p>
      </div>
    </div>
  );
};
