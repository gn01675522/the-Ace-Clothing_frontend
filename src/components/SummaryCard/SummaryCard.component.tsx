import { formatNumberWithCommas } from "../../utils/common.utils";

import type { FC } from "react";

import "./SummaryCard.styles.scss";

type PropsType = {
  total: number;
  userData?: {
    user: { name: string; tel: string; address: string; email: string };
  };
};

const SummaryCard: FC<PropsType> = ({ total, userData }) => {
  return (
    <div className="summary-card">
      <h2 className="summary-card__title">訂單資訊</h2>
      <div className="summary-card__item">
        <span>小計</span>
        <span>NT$ {formatNumberWithCommas(Math.round(total))}</span>
      </div>
      <div className="summary-card__item">
        <span>運費</span>
        <span>免費</span>
      </div>
      <div className="summary-card__item">
        <span>總金額</span>
        <span>NT$ {formatNumberWithCommas(Math.round(total))}</span>
      </div>
      {userData && (
        <>
          <h2 className="summary-card__title">客戶資訊</h2>
          <div className="summary-card__item">
            <span>姓名</span>
            <span>{userData?.user?.name}</span>
          </div>
          <div className="summary-card__item">
            <span>電話</span>
            <span>{userData?.user?.tel}</span>
          </div>
          <div className="summary-card__item">
            <span>地址</span>
            <span>{userData?.user?.address}</span>
          </div>
          <div className="summary-card__item">
            <span>信箱</span>
            <span>{userData?.user?.email}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryCard;
