import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";

import { Message } from "../message/Message.component";

describe("Message test suite.", () => {
  test("Should render message correctly.", () => {
    const type = "success";
    const message = "test success";

    renderWithProviders(<Message />, {
      preloadedState: {
        message: {
          hasMessage: false,
          message: { type, title: "test", text: message },
        },
      },
    });
    const spanElement = screen.getByText("test success");
    expect(spanElement).toBeInTheDocument();
  });
  test("Should render correctly svg icon when type is success.", () => {
    const type = "success";
    const message = "test success";
    renderWithProviders(<Message />, {
      preloadedState: {
        message: {
          hasMessage: false,
          message: { type, title: "test", text: message },
        },
      },
    });
    const iconElement = screen.getByLabelText("check icon");

    expect(iconElement).toBeInTheDocument();
  });
  test("Should render correctly svg icon when type is danger.", () => {
    const type = "danger";
    const message = "test danger";
    renderWithProviders(<Message />, {
      preloadedState: {
        message: {
          hasMessage: false,
          message: { type, title: "test", text: message },
        },
      },
    });
    const iconElement = screen.getByLabelText("cross icon");

    expect(iconElement).toBeInTheDocument();
  });
});
