import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test.utils";

import { AdminCouponModal } from "../../modules/admin-coupon-modal/AdminCouponModal.module";

import { formatTimestampInMilliSeconds } from "../../../../utils/common.utils";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";
import { useCouponManagementContext } from "../../modules/admin-coupon-modal/hooks/admin-coupon-modal.hooks";

import {
  mockCouponData,
  mockAdminCouponModalFormDefaultData,
} from "../../__mocks__/modules.mocks";

jest.mock("../../modules/admin-coupon-modal/hooks/admin-coupon-modal.hooks");

describe("CouponModal test suite.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("When the value of type is ‘create’, the form within the modal should either only display the default data or be empty.", () => {
    (useCouponManagementContext as jest.Mock).mockReturnValue({
      formControl: {
        formData: { id: null, form: mockAdminCouponModalFormDefaultData },
        type: FORM_OPERATION_OPTIONS.create,
      },
    });

    renderWithProviders(<AdminCouponModal />);

    const titleInput = screen.getByLabelText("標題");
    const codeInput = screen.getByLabelText("優惠碼");
    const percentInput = screen.getByLabelText("折扣(e.g: 8折 = 80)");
    const dueDateInput = screen.getByLabelText("到期日");
    const isEnabledCheckbox = screen.getByRole("checkbox");

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

  test("When type is set to ‘edit’, the form within the modal will display the corresponding values based on the provided targetData.", async () => {
    (useCouponManagementContext as jest.Mock).mockReturnValue({
      formControl: {
        formData: { id: mockCouponData.id, form: mockCouponData },
        type: FORM_OPERATION_OPTIONS.create,
      },
    });
    renderWithProviders(<AdminCouponModal />);

    const titleInput = screen.getByLabelText("標題");
    const codeInput = screen.getByLabelText("優惠碼");
    const percentInput = screen.getByLabelText("折扣(e.g: 8折 = 80)");
    const dueDateInput = screen.getByLabelText("到期日");
    const isEnabledCheckbox = screen.getByRole("checkbox");

    expect(titleInput).toHaveValue("just for test");
    expect(codeInput).toHaveValue("justForTest");
    expect(percentInput).toHaveValue(65);
    expect(isEnabledCheckbox).not.toBeChecked();
    expect(dueDateInput).toHaveValue(
      formatTimestampInMilliSeconds(new Date(1736553600000))
    );
  });
  test("Clicking on the 'x', '關閉' buttons triggers the backdropClose callback.", () => {
    const mockOnCloseHandler = jest.fn();
    const mockOnSubmitHandler = jest.fn();

    (useCouponManagementContext as jest.Mock).mockReturnValue({
      onCloseHandler: mockOnCloseHandler,
      onSubmitHandler: mockOnSubmitHandler,
      formControl: {
        formData: {
          id: mockCouponData.id,
          form: mockCouponData,
        },
        isSaveToSave: true,
        type: FORM_OPERATION_OPTIONS.create,
      },
    });

    renderWithProviders(<AdminCouponModal />);

    const closeButton = screen.getByText(/關閉/i);
    const closeXButton = screen.getByLabelText(/Close/i);
    const saveButton = screen.getByText(/儲存/i);

    fireEvent.click(closeButton);
    fireEvent.click(closeXButton);
    fireEvent.click(saveButton);

    expect(mockOnCloseHandler).toHaveBeenCalledTimes(2);
    expect(mockOnSubmitHandler).toHaveBeenCalledTimes(1);
  });
});
