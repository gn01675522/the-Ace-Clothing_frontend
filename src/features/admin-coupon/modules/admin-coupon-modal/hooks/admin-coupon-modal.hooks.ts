import { useState, useEffect, useContext } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/redux-hooks";

import { CouponManagementContext } from "../contexts/admin-coupon-modal.context";

import {
  updateAdminCouponAsync,
  createAdminCouponAsync,
} from "../../../store/adminCoupon.asyncThunk";
import {
  selectAdminCouponsEditModalTargetData,
  selectAdminCouponsEditModalType,
} from "../../../store/adminCoupon.selector";

import { defaultCouponFormStructure } from "../config/admin-coupon-modal.config";

import {
  formatTimestampInMilliSeconds,
  formatDateToMilliSeconds,
} from "../../../../../utils/common.utils";

import { FORM_OPERATION_OPTIONS } from "../../../../../shared/types";

import type { ChangeEvent } from "react";
import type { AdminCouponFormType } from "../../../types/admin-coupon.types";

export const useCouponManagementContext = () => {
  const context = useContext(CouponManagementContext);

  if (!context)
    throw new Error(
      "useCouponManagementContext must be used within CouponManagementContextProvider"
    );

  return context;
};

export const useAdminCouponEditModalFormControl = () => {
  const [formData, setFormData] = useState<{
    form: AdminCouponFormType;
    id: string | null;
  }>({
    form: defaultCouponFormStructure,
    id: null,
  });

  const targetData = useAppSelector(selectAdminCouponsEditModalTargetData);
  const type = useAppSelector(selectAdminCouponsEditModalType);

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

    if (type == FORM_OPERATION_OPTIONS.create) {
      const newData = {
        ...formData.form,
        due_date: formatDateToMilliSeconds(formData.form.due_date),
      };
      dispatch(createAdminCouponAsync(newData));
    } else if (type == FORM_OPERATION_OPTIONS.edit && formData.id) {
      const newData = {
        ...formData.form,
        id: formData.id,
        due_date: formatDateToMilliSeconds(formData.form.due_date),
      };

      dispatch(updateAdminCouponAsync(newData));
    }
  };

  useEffect(() => {
    if (type === FORM_OPERATION_OPTIONS.edit && targetData) {
      const { id, ...rest } = targetData;
      const newData = {
        ...rest,
        due_date: rest.due_date
          ? formatTimestampInMilliSeconds(rest.due_date)
          : defaultCouponFormStructure.due_date,
      };
      setFormData({ id: id, form: newData });
    } else setFormData({ id: null, form: defaultCouponFormStructure });
  }, [targetData]);

  return {
    formData,
    type,
    isSaveToSave,
    setFormData,
    onChangeHandler,
    submitForm,
  };
};
