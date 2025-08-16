import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../../utils/test.utils";

import { CouponModal } from "../CouponModal.component";

import { formatTimestampInMilliSeconds } from "../../../../../utils/common.utils";

import type { AdminCoupon } from "../../../DTOs/adminCoupon.types";

const mockCoupon: AdminCoupon = {
  id: "1234567",
  title: "just for test",
  is_enabled: 0,
  percent: 65,
  due_date: 1736553600000,
  code: "justForTest",
  num: 2,
};

describe("CouponModal test suite.", () => {
  test("When the value of createOrEdit is ‘create’, the form within the modal should either only display the default data or be empty.", () => {
    renderWithProviders(
      <CouponModal
        targetData={null}
        createOrEdit="create"
        backdropClose={() => {}}
      />
    );
    const titleInput = screen.getByLabelText("標題");
    const codeInput = screen.getByLabelText("優惠碼");
    const percentInput = screen.getByLabelText("折扣(e.g: 8折 = 80)");
    const dueDateInput = screen.getByLabelText("到期日");
    const isEnabledCheckbox = screen.getByLabelText("是否啟用");

    expect(titleInput).toHaveValue("");
    //* 預設為 testCode
    expect(codeInput).toHaveValue("testCode");
    //* 預設為 80
    expect(percentInput).toHaveValue(80);
    //* 預設為轉換後的今日日期
    expect(dueDateInput).toHaveValue(formatTimestampInMilliSeconds(new Date()));
    //* 預設為已啟用
    expect(isEnabledCheckbox).toBeChecked();
  });
  test("When createOrEdit is set to ‘edit’, the form within the modal will display the corresponding values based on the provided targetData.", async () => {
    renderWithProviders(
      <CouponModal
        targetData={mockCoupon}
        createOrEdit="edit"
        backdropClose={() => {}}
      />
    );

    const titleInput = screen.getByLabelText("標題");
    const codeInput = screen.getByLabelText("優惠碼");
    const percentInput = screen.getByLabelText("折扣(e.g: 8折 = 80)");
    const dueDateInput = screen.getByLabelText("到期日");
    const isEnabledCheckbox = screen.getByLabelText("是否啟用");

    expect(titleInput).toHaveValue("just for test");
    expect(codeInput).toHaveValue("justForTest");
    expect(percentInput).toHaveValue(65);
    expect(isEnabledCheckbox).not.toBeChecked();
    expect(dueDateInput).toHaveValue(
      formatTimestampInMilliSeconds(new Date(1736553600000))
    );
  });
  test("Clicking on the 'x', '關閉' buttons triggers the backdropClose callback.", () => {
    const onClick = jest.fn();

    renderWithProviders(
      <CouponModal
        targetData={mockCoupon}
        createOrEdit="edit"
        backdropClose={onClick}
      />
    );

    const closeButton = screen.getByText(/關閉/i);
    const saveButton = screen.getByText(/儲存/i);
    const closeXButton = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButton);
    fireEvent.click(saveButton);
    fireEvent.click(closeXButton);

    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
