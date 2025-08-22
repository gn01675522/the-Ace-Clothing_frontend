import type { IGeneralResponse } from "../../../shared/types";

export interface IGetAdminCoupon {
  id: string;
  title: string;
  is_enabled: 1 | 0;
  percent: number;
  due_date: number;
  code: string;
  num: number;
}

export type ICreateAdminCoupon = Omit<IGetAdminCoupon, "id">;

export interface IAdminCouponRes extends IGeneralResponse {
  coupons: IGetAdminCoupon[];
}
