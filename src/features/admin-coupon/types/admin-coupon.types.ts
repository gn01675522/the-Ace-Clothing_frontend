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
