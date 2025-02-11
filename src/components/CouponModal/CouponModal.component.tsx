import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";
import ModalPortal from "../ModalPortal/ModalPortal.component";

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

type DefaultData = {
  title: string;
  is_enabled: 0 | 1;
  percent: number;
  due_date: string;
  code: string;
};

const defaultCreateData: DefaultData = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
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
  const [formData, setFormData] = useState<DefaultData | AdminCouponWithId>(
    defaultCreateData
  );

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

  const onSubmitHandler = (e: MouseEvent<HTMLElement>) => {
    if (createOrEdit == "create") {
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
    if (createOrEdit === "edit" && targetData) {
      const newData = {
        ...targetData,
        due_date: targetData
          ? formatTimestampInMilliSeconds(targetData.due_date)
          : defaultCreateData.due_date,
      };
      setFormData(newData);
    }
  }, [createOrEdit]);

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
                        ? formatTimestampInMilliSeconds(formData[content.id])
                        : formData[
                            content.id as keyof (
                              | AdminCouponWithId
                              | DefaultData
                            )
                          ]
                    }
                    onChange={onChangeHandler}
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
