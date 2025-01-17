import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button, { BUTTON_TYPE_CLASS } from "../Button.component";

describe("button tests", () => {
  test("should render btn-rect-bl-nm class button when nothing passed", () => {
    render(<Button />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn-rect-bl-nm");
  });

  test("should render base class button when passed rectBlackMe type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASS.rectBlackMe} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn-rect-bl-me");
  });

  test("should be disabled if isLoading is true", () => {
    render(<Button isLoading={true} />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  test("trigger function when clicking the button", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
