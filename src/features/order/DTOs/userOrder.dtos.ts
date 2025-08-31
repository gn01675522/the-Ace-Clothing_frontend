import type { UserBasicInfo } from "../../../shared/types/interface";
import type { AdminCouponDto } from "features/admin-coupon/DTOs/adminCoupon.dtos";
import type { UserProducts } from "features/product/DTOs/userProduct.dtos";
import type { APIResponseWithoutData } from "../../../shared/types/interface";

export interface UserOrderDto {
  create_at: number;
  id: string;
  is_paid: boolean;
  message: string;
  products: {
    id: string;
    product_id: string;
    qty: number;
    coupon: AdminCouponDto;
    final_total: number;
    product: UserProducts;
    total: number;
  }[];
  total: number;
  user: UserBasicInfo;
}

export interface UserOrderDtoWithNum extends UserOrderDto {
  num: number;
}

export interface FetchAdminOrderResDto extends APIResponseWithoutData {
  orders: UserOrderDtoWithNum[];
}
