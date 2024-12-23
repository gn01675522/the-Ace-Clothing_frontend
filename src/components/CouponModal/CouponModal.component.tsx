import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";
import ModalPortal from "../ModalPortal/ModalPortal.component";

import { selectAdminCouponsTempData } from "../../store/adminCoupon/adminCoupon.selector";

import {
  createAdminCouponAsync,
  updateAdminCouponAsync,
} from "../../store/adminCoupon/adminCoupon.asyncThunk";

import { formContent } from "./formContent.data";
import { formatTimestampInMilliSeconds } from "../../utils/common.utils";

import type {
  FC,
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import type {
  AdminCoupon,
  AdminCouponWithId,
  CreateAdminCoupon,
} from "../../store/adminCoupon/adminCoupon.types";

import "./CouponModal.styles.scss";

const defaultCreateData: CreateAdminCoupon = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: 1555459200,
  code: "testCode",
};

type PropsType = {
  targetData: AdminCoupon | null;
  createOrEdit: "create" | "edit";
  backdropClose: Dispatch<SetStateAction<boolean>>;
};

const CouponModal: FC<PropsType> = ({
  createOrEdit,
  targetData,
  backdropClose,
}) => {
  const [formData, setFormData] = useState<
    CreateAdminCoupon | AdminCouponWithId
  >(defaultCreateData);
  const [date, setDate] = useState(new Date());

  const dispatch = useAppDispatch();

  const tempCoupon = useAppSelector(selectAdminCouponsTempData);

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
    if (createOrEdit == "create") {
      dispatch(createAdminCouponAsync({ formData, date }));
    } else {
      const data = { formData, date } as {
        formData: AdminCouponWithId;
        date: Date;
      };
      dispatch(updateAdminCouponAsync(data));
    }
    backdropClose(false);
  };

  useEffect(() => {
    if (createOrEdit === "edit" && targetData) {
      setFormData(targetData);
      setDate((prev) => (tempCoupon ? new Date(tempCoupon.due_date) : prev));
    }
  }, [createOrEdit, tempCoupon]);

  return (
    <ModalPortal backdropClose={onClickToClose}>
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
            onClick={onClickToClose}
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
              onChange={onChangeHandler}
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
                        : formData[
                            content.id as keyof (
                              | AdminCouponWithId
                              | CreateAdminCoupon
                            )
                          ]
                    }
                    onChange={
                      content.id === "due_date"
                        ? (e) => {
                            setDate(new Date(e.target.value));
                          }
                        : onChangeHandler
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
            onClick={onClickToClose}
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
    </ModalPortal>
  );
};

export default CouponModal;
