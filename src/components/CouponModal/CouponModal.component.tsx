import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";
import ModalBackdrop from "../ModalPortal/ModalBackdrop.component";

import { selectAdminCouponsTempData } from "../../store/adminCoupon/adminCoupon.selector";
import { setAdminCouponsOpen } from "../../store/adminCoupon/adminCoupon.slice";

import {
  createAdminCouponAsync,
  updateAdminCouponAsync,
} from "../../store/adminCoupon/adminCoupon.asyncThunk";

import { formContent } from "./formContent.data";
import { formatTimestampInMilliSeconds } from "../../utils/common.utils";

import type { FC, ChangeEvent } from "react";
import type {
  AdminCoupon,
  AdminCouponWithId,
} from "../../store/adminCoupon/adminCoupon.types";

import "./CouponModal.styles.scss";

const defaultCreateData: AdminCoupon = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: 1555459200,
  code: "testCode",
};

type PropsType = {
  createOrEdit: "create" | "edit";
  backdropClose: () => void;
};

const CouponModal: FC<PropsType> = ({ createOrEdit, backdropClose }) => {
  const [formData, setFormData] = useState(defaultCreateData);
  const [date, setDate] = useState(new Date());

  const dispatch = useAppDispatch();

  const tempCoupon = useAppSelector(selectAdminCouponsTempData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "percent") {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "is_enabled") {
      setFormData({ ...formData, [name]: +e.target.checked as 1 | 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onCloseModalHandler = () => {
    dispatch(setAdminCouponsOpen(false));
  };

  const onSubmitHandler = () => {
    if (createOrEdit == "create") {
      const data = { formData, date };
      dispatch(createAdminCouponAsync(data));
    } else {
      const data = { formData, date } as {
        formData: AdminCouponWithId;
        date: Date;
      };
      dispatch(updateAdminCouponAsync(data));
    }
  };

  useEffect(() => {
    if (createOrEdit === "edit" && tempCoupon) {
      setFormData(tempCoupon);
      setDate((prev) => (tempCoupon ? new Date(tempCoupon.due_date) : prev));
    }
  }, [createOrEdit, tempCoupon]);

  return (
    <ModalBackdrop backdropClose={backdropClose}>
      <div className="coupon-modal">
        <div className="coupon-modal__header">
          <h1 className="coupon-modal__header-title">
            {createOrEdit === "create"
              ? "建立新優惠券"
              : `優惠券名稱： ${formData.title}`}
          </h1>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            aria-label="Close"
            onClick={onCloseModalHandler}
          >
            ｘ
          </Button>
        </div>

        <div className="coupon-modal__body">
          <div className="coupon-modal__body-check">
            <label
              className="coupon-modal__body-check-label"
              htmlFor="is_enabled"
            >
              是否啟用
            </label>
            <input
              className="coupon-modal__body-check-input"
              type="checkbox"
              id="is_enabled"
              name="is_enabled"
              checked={!!formData.is_enabled}
              onChange={handleChange}
            />
          </div>
          <div className="coupon-modal__body-content">
            {formContent.map((content) => {
              return (
                <div
                  className="coupon-modal__body-content-group"
                  key={content.id}
                >
                  <label
                    className="coupon-modal__body-content-group-label"
                    htmlFor={content.id}
                  >
                    {content.title}
                  </label>
                  <input
                    type={content.type}
                    id={content.id}
                    placeholder={
                      content.id === "percent"
                        ? undefined
                        : `請輸入${content.title}`
                    }
                    name={content.id}
                    className="coupon-modal__body-content-group-input"
                    value={
                      content.id === "due_date"
                        ? formatTimestampInMilliSeconds(date)
                        : formData[content.id as keyof AdminCoupon]
                    }
                    onChange={
                      content.id === "due_date"
                        ? (e) => {
                            setDate(new Date(e.target.value));
                          }
                        : handleChange
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="coupon-modal__footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onCloseModalHandler}
          >
            關閉
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onSubmitHandler}
            disabled={formData.title.length === 0}
          >
            儲存
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default CouponModal;
