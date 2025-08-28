import type { IGetAdminCoupon } from "../DTOs/adminCoupon.dtos";
import type { FORM_OPERATION_OPTIONS } from "shared/types";

export enum ADMIN_COUPON_FORM_CLASSES {
  create = "create",
  edit = "edit",
}

export type AdminCouponFormType = {
  title: string;
  is_enabled: 0 | 1;
  percent: number;
  due_date: string;
  code: string;
  num: number;
};

export type couponEditModalType = {
  isOpen: boolean;
  type: FORM_OPERATION_OPTIONS;
  targetData: IGetAdminCoupon | null;
};
