import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../../utils/test.utils";

import { AdminCouponModal } from "../AdminCouponModal.module";

import { formatTimestampInMilliSeconds } from "../../../../../utils/common.utils";
import { ADMIN_COUPON_FORM_CLASSES } from "../../../types/admin-coupon.types";

import type { IGetAdminCoupon } from "../../../DTOs/adminCoupon.dtos";

const mockUseAdminCouponContext = jest.fn();
jest.mock("../../../hooks/admin-coupon.hooks", () => ({
  useAdminCouponContext: () => mockUseAdminCouponContext(),
}));

const mockDefaulCoupon = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
  code: "testCode",
  num: 1,
};

const mockCoupon: IGetAdminCoupon = {
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
    mockUseAdminCouponContext.mockReturnValue({
      formControl: {
        targetData: mockCoupon,
        onChangeHandler: jest.fn(),
        formData: { id: null, form: mockDefaulCoupon },
        createOrEdit: ADMIN_COUPON_FORM_CLASSES.create,
      },
      modalControl: { switchModalOpen: jest.fn() },
    });
    renderWithProviders(<AdminCouponModal />);
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
    const { id, ...rest } = mockCoupon;
    const newData = { id, form: rest };
    mockUseAdminCouponContext.mockReturnValue({
      formControl: {
        formData: newData,
        onChangeHandler: jest.fn(),
        createOrEdit: ADMIN_COUPON_FORM_CLASSES.edit,
      },
      modalControl: { switchModalOpen: jest.fn() },
    });
    renderWithProviders(<AdminCouponModal />);

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
    const mockSwitchModalOpen = jest.fn();
    const mockSetIsModalOpen = jest.fn();
    const mockCloseModalAndClearForm = jest.fn();
    mockUseAdminCouponContext.mockReturnValue({
      formControl: {
        formData: { id: mockCoupon.id, form: mockCoupon },
        onChangeHandler: jest.fn(),
      },
      modalControl: {
        setIsModalOpen: mockSetIsModalOpen,
        switchModalOpen: mockSwitchModalOpen,
      },
      closeModalAndClearForm: mockCloseModalAndClearForm,
    });

    renderWithProviders(<AdminCouponModal />);

    const closeButton = screen.getByText(/關閉/i);
    const closeXButton = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButton);
    fireEvent.click(closeXButton);

    expect(mockCloseModalAndClearForm).toHaveBeenCalledTimes(2);
  });
});
