import type { UserBasicInfo } from "../../../shared/types/interface";
import type { Pagination } from "../../../shared/types/types";
import type { AdminCoupon } from "features/admin-coupon/DTOs/adminCoupon.dtos";
import type { Product } from "features/product/DTOs/userProduct.types";

export interface OrderDetail {
  create_at: number;
  id: string;
  is_paid: boolean;
  message: string;
  products: {
    id: string;
    product_id: string;
    qty: number;
    coupon: AdminCoupon;
    final_total: number;
    product: Product;
    total: number;
  }[];
  total: number;
  user: UserBasicInfo;
}

export interface OrderDetailWithNum extends OrderDetail {
  num: number;
}

export interface OrderDetails {
  success: true;
  orders: OrderDetailWithNum[];
  pagination: Pagination;
  messages: string[];
}
