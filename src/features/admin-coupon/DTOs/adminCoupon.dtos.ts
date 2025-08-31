import type { APIResponseWithoutData } from "../../../shared/types";

export interface AdminCouponDto {
  id: string;
  title: string;
  is_enabled: 1 | 0;
  percent: number;
  due_date: number;
  code: string;
  num: number;
}

export type CreateCouponDto = Omit<AdminCouponDto, "id">;

export interface FetchAdminCouponResDto extends APIResponseWithoutData {
  coupons: AdminCouponDto[];
}
