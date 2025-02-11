import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";

import CouponModal from "../CouponModal.component";

import { formatTimestampInMilliSeconds } from "../../../utils/common.utils";

import type { AdminCoupon } from "store/adminCoupon/adminCoupon.types";

describe("CouponModal test suite.", () => {
  // 傳入 backdropClose，並按下關閉時，要能關閉整個 components
  // 傳入 backdropClose，並按下儲存時，要能儲存資料，接著關閉整個 components

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
    const mockCoupon: AdminCoupon = {
      id: "1234567",
      title: "just for test",
      is_enabled: 0,
      percent: 65,
      due_date: 1736553600000,
      code: "justForTest",
    };

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
  test("Clicking on the 'x', '關閉' buttons triggers the backdropClose callback.", async () => {
    const onClick = jest.fn();

    const mockCoupon: AdminCoupon = {
      id: "1234567",
      title: "just for test",
      is_enabled: 0,
      percent: 65,
      due_date: 1736553600000,
      code: "justForTest",
    };

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

    await fireEvent.click(closeButton);
    await fireEvent.click(saveButton);
    await fireEvent.click(closeXButton);

    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
