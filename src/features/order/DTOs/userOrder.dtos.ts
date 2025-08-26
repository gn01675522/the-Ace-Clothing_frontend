import type { UserBasicInfo } from "../../../shared/types/interface";
import type { PaginationType } from "../../../shared/types/types";
import type { IGetAdminCoupon } from "features/admin-coupon/DTOs/adminCoupon.dtos";
import type { Product } from "features/product/DTOs/userProduct.types";

export interface IOrderDetail {
  create_at: number;
  id: string;
  is_paid: boolean;
  message: string;
  products: {
    id: string;
    product_id: string;
    qty: number;
    coupon: IGetAdminCoupon;
    final_total: number;
    product: Product;
    total: number;
  }[];
  total: number;
  user: UserBasicInfo;
}

export interface OrderDetailWithNum extends IOrderDetail {
  num: number;
}

export interface IOrderDetails {
  success: true;
  orders: OrderDetailWithNum[];
  pagination: PaginationType;
  messages: string[];
}
