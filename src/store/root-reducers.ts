import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { cartReducer } from "../features/cart/index";
import {
  userProductReducer,
  adminProductReducer,
} from "../features/product/index";
import { messageReducer } from "./message/message.slice";
import { adminCouponReducer } from "../features/admin-coupon/store/adminCoupon.slice";
import { adminOrderReducer } from "./adminOrder/adminOrder.slice";
import { userOrderReducer } from "./userOrder/userOrder.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  userProduct: userProductReducer,
  message: messageReducer,
  adminProduct: adminProductReducer,
  adminCoupon: adminCouponReducer,
  adminOrder: adminOrderReducer,
  userOrder: userOrderReducer,
});
