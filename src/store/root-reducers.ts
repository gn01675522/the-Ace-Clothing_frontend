import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "../features/user/index";
import { cartReducer } from "../features/cart/index";
import {
  userProductReducer,
  adminProductReducer,
} from "../features/product/index";
import { adminCouponReducer } from "../features/admin-coupon/index";
import { adminOrderReducer } from "../features/order/index";
import { userOrderReducer } from "../features/order/index";
import { messageReducer } from "./message/message.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  userProduct: userProductReducer,
  adminProduct: adminProductReducer,
  adminCoupon: adminCouponReducer,
  adminOrder: adminOrderReducer,
  userOrder: userOrderReducer,
  message: messageReducer,
});
