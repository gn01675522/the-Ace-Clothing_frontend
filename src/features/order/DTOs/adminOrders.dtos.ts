import type { PaginationType } from "../../../shared/types/types";
import type { IGetAdminCoupon } from "../../admin-coupon/index";
import type { Product } from "../../product/DTOs/userProduct.types";

export interface IOrder {
  title: string;
  create_at: number;
  id: string;
  is_paid: boolean;
  message: string;
  products: [
    {
      id: string;
      product_id: string;
      qty: number;
      coupon: IGetAdminCoupon;
      final_total: number;
      product: Product;
      total: number;
    }
  ];
  status: number;
  total: number;
  user: {
    address: string;
    email: string;
    name: string;
    tel: string;
  };
}

export interface AdminOrder {
  success: boolean;
  orders: IOrder[];
  pagination: PaginationType;
  messages: string[];
}
