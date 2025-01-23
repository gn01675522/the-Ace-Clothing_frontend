import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button, { BUTTON_TYPE_CLASS } from "../Button.component";

describe("Button test suite.", () => {
  test("Renders with default props and applies the 'btn-rect-bl-nm' class.", () => {
    render(<Button />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn-rect-bl-nm");
  });

  test("Applies the correct class when a specific button type is passed.", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASS.rectBlackMe} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn-rect-bl-me");
  });

  test("Renders as disabled when the 'isLoading' prop is true.", () => {
    render(<Button isLoading={true} />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  test("Calls the event handler function when the button is clicked.", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
