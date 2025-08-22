import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { AdminCouponContext } from "../contexts/admin-coupon.context";

import {
  updateAdminCouponAsync,
  createAdminCouponAsync,
  fetchAdminCouponsAsync,
} from "../store/adminCoupon.asyncThunk";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
  selectAdminCouponsIsLoading,
} from "../store/adminCoupon.selector";
import { setClearAdminCouponState } from "../store/adminCoupon.slice";

import {
  formatTimestampInMilliSeconds,
  formatDateToMilliSeconds,
} from "../../../utils/common.utils";

import { ADMIN_COUPON_FORM_CLASSES } from "../types/admin-coupon.types";

import type { ChangeEvent } from "react";
import type {
  IGetAdminCoupon,
  ICreateAdminCoupon,
} from "../DTOs/adminCoupon.dtos";
import type { AdminCouponFormType } from "../types/admin-coupon.types";

export const useAdminCouponContext = () => {
  const context = useContext(AdminCouponContext);

  if (!context)
    throw new Error(
      "useAdminCouponContext must be used within AdminCouponContextProvider"
    );

  return context;
};

const defaultCreateData: AdminCouponFormType = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
  code: "testCode",
  num: 1,
};

type FormState = {
  form: AdminCouponFormType;
  id: string | null;
};

export const useAdminCouponFormControl = () => {
  const [targetData, setTargetData] = useState<IGetAdminCoupon | null>(null);
  const [formData, setFormData] = useState<FormState>({
    form: defaultCreateData,
    id: null,
  });
  const [createOrEdit, setCreateOrEdit] = useState(
    ADMIN_COUPON_FORM_CLASSES.create
  );

  const dispatch = useAppDispatch();

  const isSaveToSave = formData.form.title.length > 0;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "percent") {
      setFormData((prev) => ({
        ...prev,
        form: { ...formData.form, [name]: Number(value) },
      }));
    } else if (name === "is_enabled") {
      setFormData((prev) => ({
        ...prev,
        form: { ...formData.form, [name]: +e.target.checked as 1 | 0 },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        form: { ...formData.form, [name]: value },
      }));
    }
  };

  const submitForm = () => {
    if (!isSaveToSave) return;

    if (createOrEdit == ADMIN_COUPON_FORM_CLASSES.create) {
      const newData = {
        ...formData.form,
        due_date: formatDateToMilliSeconds(formData.form.due_date),
      };
      dispatch(createAdminCouponAsync(newData));
    } else if (createOrEdit == ADMIN_COUPON_FORM_CLASSES.edit && formData.id) {
      const newData = {
        ...formData.form,
        id: formData.id,
        due_date: formatDateToMilliSeconds(formData.form.due_date),
      };

      dispatch(updateAdminCouponAsync(newData));
    }
  };

  useEffect(() => {
    if (targetData) {
      const newData = {
        ...targetData,
        due_date: targetData.due_date
          ? formatTimestampInMilliSeconds(targetData.due_date)
          : defaultCreateData.due_date,
      };
      setFormData({ id: targetData.id, form: newData });
    }
    return () => {
      setTargetData(null);
      setFormData({ id: null, form: defaultCreateData });
    };
  }, [targetData]);

  return {
    formData,
    createOrEdit,
    isSaveToSave,
    setTargetData,
    setCreateOrEdit,
    onChangeHandler,
    submitForm,
  };
};

export const useAdminCouponStateFetch = () => {
  const dispatch = useAppDispatch();

  const coupons = useAppSelector(selectAdminCoupons);
  const pagination = useAppSelector(selectAdminCouponsPagination);
  const isLoading = useAppSelector(selectAdminCouponsIsLoading);

  useEffect(() => {
    dispatch(fetchAdminCouponsAsync());
    return () => {
      setClearAdminCouponState();
    };
  }, []);

  return { coupons, pagination, isLoading };
};

export const useAdminCouponModalControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchModalOpen = () => setIsModalOpen(!isModalOpen);

  return {
    isModalOpen,
    setIsModalOpen,
    switchModalOpen,
  };
};
