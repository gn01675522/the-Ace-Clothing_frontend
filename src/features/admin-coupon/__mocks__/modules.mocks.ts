import { formatTimestampInMilliSeconds } from "../../../utils/common.utils";

import type { AdminCouponDto } from "../DTOs/adminCoupon.dtos";

export const mockAdminCouponModalFormDefaultData = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
  code: "testCode",
  num: 1,
};

export const mockCouponData: AdminCouponDto = {
  id: "1234567",
  title: "just for test",
  is_enabled: 0,
  percent: 65,
  due_date: 1736553600000,
  code: "justForTest",
  num: 2,
};
