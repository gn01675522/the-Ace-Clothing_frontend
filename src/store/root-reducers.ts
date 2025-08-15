import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { cartReducer } from "../features/cart/index";
import { userProductReducer } from "./userProduct/userProduct.slice";
import { messageReducer } from "./message/message.slice";
import { adminCouponReducer } from "./adminCoupon/adminCoupon.slice";
import { adminProductReducer } from "./adminProduct/adminProduct.slice";
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
