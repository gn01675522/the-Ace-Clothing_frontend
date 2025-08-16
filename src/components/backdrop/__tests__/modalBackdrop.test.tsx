import { screen, render, fireEvent } from "@testing-library/react";

import { Backdrop } from "../../backdrop/Backdrop.component";

describe("Backdrop test suite.", () => {
  test("Should render children correctly.", () => {
    const onClick = () => {};
    const childrenText = "test";

    render(
      <Backdrop backdropClose={onClick}>
        <div>{childrenText}</div>
      </Backdrop>
    );

    const childrenElment = screen.getByText(childrenText);

    expect(childrenElment).toBeInTheDocument();
  });
  test("Calls backdropClose when clicking backdrop.", () => {
    const onClick = jest.fn();
    const childrenText = "test";

    const { container } = render(
      <Backdrop backdropClose={onClick}>
        <div>{childrenText}</div>
      </Backdrop>
    );

    const backdropElement = container.querySelector(".modal__backdrop");

    expect(backdropElement).toBeInTheDocument();

    fireEvent.click(backdropElement!);

    expect(onClick).toHaveBeenCalled();
  });
});
