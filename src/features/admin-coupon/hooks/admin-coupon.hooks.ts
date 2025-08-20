import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/redux-hooks";

import {
  updateAdminCouponAsync,
  createAdminCouponAsync,
} from "../store/adminCoupon.asyncThunk";

import { formatTimestampInMilliSeconds } from "../../../utils/common.utils";

import type { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import type {
  AdminCouponWithId,
  CreateAdminCoupon,
  AdminCoupon,
} from "../DTOs/adminCoupon.dtos";
import type { AdminCouponFormType } from "../types/admin-coupon.types";

const defaultCreateData: AdminCouponFormType = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
  code: "testCode",
};

type PropsType = {
  targetData: AdminCoupon | null;
  type: "create" | "edit";
  backdropClose: Dispatch<SetStateAction<boolean>>;
};

export const useAdminCouponForm = ({
  type,
  targetData,
  backdropClose,
}: PropsType) => {
  const [formData, setFormData] = useState<
    AdminCouponFormType | AdminCouponWithId
  >(defaultCreateData);

  const dispatch = useAppDispatch();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "percent") {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "is_enabled") {
      setFormData({ ...formData, [name]: +e.target.checked as 1 | 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) backdropClose(false);
  };

  const onSubmitHandler = () => {
    if (type == "create") {
      dispatch(
        createAdminCouponAsync({
          formData: formData as CreateAdminCoupon,
          date: new Date(formData.due_date),
        })
      );
    } else {
      const data = { formData, date: new Date(formData.due_date) } as {
        formData: AdminCouponWithId;
        date: Date;
      };
      dispatch(updateAdminCouponAsync(data));
    }
    backdropClose(false);
  };

  useEffect(() => {
    if (type === "edit" && targetData) {
      const newData = {
        ...targetData,
        due_date: targetData
          ? formatTimestampInMilliSeconds(targetData.due_date)
          : defaultCreateData.due_date,
      };
      setFormData(newData);
    }
  }, [type]);

  return {
    formData,
    onClickToClose,
    onChangeHandler,
    onSubmitHandler,
  };
};
