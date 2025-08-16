import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import { selectUserOrders } from "../../../../store/userOrder/userOrder.selector";

import { formatTimestampInMilliSeconds } from "../../../../utils/common.utils";

import type { FC } from "react";
import type { OrderDetail } from "../../../../store/userOrder/userOrder.types";

import "./OrderDetails.styles.scss";

const tableContent = [
  { title: "訂單編號", content: "id" },
  { title: "訂單日期", content: "create_at" },
  { title: "運送地址", content: "address" },
  { title: "總金額", content: "total" },
];

type PropsType = {
  email: string;
};

const OrderDetails: FC<PropsType> = ({ email }) => {
  const [orderList, setOrderList] = useState<OrderDetail[]>([]);
  const orderDetail = useSelector(selectUserOrders);

  useEffect(() => {
    if (email && orderDetail) {
      setOrderList(orderDetail.filter((order) => order.user.email === email));
    }
  }, [email, orderDetail]);

  return (
    <div className="order-detail">
      <div className="order-detail__list">
        {orderList.length !== 0 ? (
          orderList.map((order) => (
            <div className="order-detail__card" key={order.id}>
              <div
                className={`order-detail__card-paid-state ${
                  order.is_paid === true
                    ? "order-detail__card-paid-state--paid"
                    : "order-detail__card-paid-state--unpaid"
                }`}
              >
                {order.is_paid === true ? "已付款" : "未付款"}
              </div>

              <div className="order-detail__card-content">
                {tableContent.map((item, i) => (
                  <div
                    className={`order-detail__card-content-item ${
                      i === tableContent.length - 1
                        ? " order-detail__card-content-item-last"
                        : ""
                    }`}
                    key={item.content}
                  >
                    <div className="order-detail__card-content-item-title">
                      {item.title}
                    </div>
                    <div className="order-detail__card-content-item-value">
                      {item.content === "address"
                        ? order.user.address
                        : item.content === "total"
                        ? Math.round(order[item.content])
                        : item.content === "create_at"
                        ? formatTimestampInMilliSeconds(order[item.content])
                        : order.id}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-detail__card-function">
                <Button
                  type="button"
                  buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
                >
                  BUY AGAIN
                </Button>
                <Button
                  type="button"
                  buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
                >
                  DETAIL
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="order-detail__list-no-order">查無訂單</div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
