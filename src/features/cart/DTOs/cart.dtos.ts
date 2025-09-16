import type { AdminCouponDto } from "../../admin-coupon/DTOs/adminCoupon.dtos";
import type { APIResponseWithoutData } from "../../../shared/types";

export interface CartItemDto {
  id: string;
  coupon: AdminCouponDto;
  final_total: number;
  product: {
    id: string;
    category: string;
    content: string;
    description: string;
    imageUrl: string;
    imagesUrl: string[];
    is_enabled: 1 | 0;
    num: number;
    origin_price: number;
    price: number;
    title: string;
    unit: string;
  };
  product_id: string;
  qty: number;
  total: number;
}

export interface CartInfoDto {
  carts: CartItemDto[];
  total: number;
  final_total: number;
}
export interface FetchCartItemsResDto extends APIResponseWithoutData {
  data: CartInfoDto;
}
export interface CartItemAddToCart {
  product_id: string;
  qty: number;
}
