import type { UserBasicInfo } from "../../../shared/types/interface";
import type { AdminCouponDto } from "features/admin-coupon/DTOs/adminCoupon.dtos";
import type { UserProductsDto } from "features/product/DTOs/userProduct.dtos";
import type { APIResponseWithoutData } from "../../../shared/types/interface";

export interface UserOrderDto {
  create_at: number;
  id: string;
  is_paid: boolean;
  products: {
    [key: string]: {
      final_total: number;
      id: string;
      product: UserProductsDto;
      product_id: string;
      qty: number;
      total: number;
    };
  };
  total: number;
  user: UserBasicInfo;
}

export interface UserOrderDtoWithNum extends UserOrderDto {
  num: number;
}

export interface FetchUserOrderResDto extends APIResponseWithoutData {
  orders: UserOrderDtoWithNum[];
}
