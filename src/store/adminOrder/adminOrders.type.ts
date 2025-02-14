import type { Pagination } from "../../shared/types/types";
import type { AdminCoupon } from "store/adminCoupon/adminCoupon.types";
import type { Product } from "store/userProduct/userProduct.types";

export interface Order {
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
      coupon: AdminCoupon;
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
  orders: Order[];
  pagination: Pagination;
  messages: string[];
}
