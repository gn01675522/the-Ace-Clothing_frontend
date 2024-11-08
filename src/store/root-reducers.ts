import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { cartReducer } from "./cart/cart.slice";
import { userProductReducer } from "./userProduct/userProduct.slice";
import { messageReducer } from "./message/message.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  userProduct: userProductReducer,
  message: messageReducer,
});
