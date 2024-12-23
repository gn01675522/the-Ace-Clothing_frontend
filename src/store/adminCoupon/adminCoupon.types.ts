import type { Pagination } from "../../shared/types/types";

export interface AdminCoupon {
  id: string;
  title: string;
  is_enabled: 1 | 0;
  percent: number;
  due_date: number;
  code: string;
}

export interface CreateAdminCoupon {
  title: string;
  is_enabled: 1 | 0;
  percent: number;
  due_date: number;
  code: string;
}

export interface AdminCouponWithId extends AdminCoupon {
  id: string;
}

export interface AdminCouponRes {
  success: boolean;
  coupons: AdminCoupon[];
  pagination: Pagination;
  messages: string[];
}
