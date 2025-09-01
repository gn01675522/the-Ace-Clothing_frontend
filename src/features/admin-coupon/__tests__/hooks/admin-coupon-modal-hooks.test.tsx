import { renderHook, act } from "@testing-library/react";
import { useAdminCouponEditModalFormControl } from "../../modules/admin-coupon-modal/hooks/admin-coupon-modal.hooks";
import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";
import { Provider } from "react-redux";
import { store as setupStore } from "../../../../store/store";
import { formatTimestampInMilliSeconds } from "../../../../utils/common.utils";

import type { PropsWithChildren } from "react";

const preloadedState = {};
const wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={setupStore(preloadedState)}>{children}</Provider>
);
describe("Hooks Tests：useAdminCouponEditModalFormControl", () => {
  test("should initialize with default values", () => {
    const { result } = renderHook(
      () =>
        useAdminCouponEditModalFormControl({
          targetData: null,
          type: FORM_OPERATION_OPTIONS.create,
        }),
      { wrapper }
    );

    expect(result.current.formData.id).toBe(null);
    expect(result.current.formData.form.title).toBe("");
    expect(result.current.formData.form.is_enabled).toBe(1);
    expect(result.current.formData.form.percent).toBe(80);
    expect(result.current.formData.form.due_date).toBe(
      formatTimestampInMilliSeconds(new Date())
    );
    expect(result.current.formData.form.num).toBe(1);
    expect(result.current.formData.form.code).toBe("testCode");
    expect(result.current.type).toBe(FORM_OPERATION_OPTIONS.create);
    expect(result.current.isSaveToSave).toBe(false);
  });

  test("should handle input change correctly", () => {
    const { result } = renderHook(
      () =>
        useAdminCouponEditModalFormControl({
          targetData: null,
          type: FORM_OPERATION_OPTIONS.create,
        }),
      { wrapper }
    );

    act(() => {
      result.current.onChangeHandler({
        target: { name: "title", value: "Test Title" },
      } as any);
    });

    expect(result.current.formData.form.title).toBe("Test Title");
  });

  // 更多測試可涵蓋 percent、is_enabled、submitForm 等情況
});
