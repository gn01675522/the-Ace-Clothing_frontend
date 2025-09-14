import type { AdminCouponDto } from "../../admin-coupon/index";
import type { UserProductsDto } from "../../product/DTOs/userProduct.dtos";
import type { APIResponseWithoutData } from "../../../shared/types";

export interface AdminOrderDto {
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
      coupon: AdminCouponDto;
      final_total: number;
      product: UserProductsDto;
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

export interface FetchAdminOrderResDto extends APIResponseWithoutData {
  orders: AdminOrderDto[];
}
