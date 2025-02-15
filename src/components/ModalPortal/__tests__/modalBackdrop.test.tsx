import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalBackdrop from "../ModalBackdrop.component";

describe("ModalBackdrop test suite.", () => {
  test("Should render children correctly.", () => {
    const onClick = () => {};
    const childrenText = "test";

    render(
      <ModalBackdrop backdropClose={onClick}>
        <div>{childrenText}</div>
      </ModalBackdrop>
    );

    const childrenElment = screen.getByText(childrenText);

    expect(childrenElment).toBeInTheDocument();
  });
  test("Calls backdropClose when clicking backdrop.", () => {
    const onClick = jest.fn();
    const childrenText = "test";

    const { container } = render(
      <ModalBackdrop backdropClose={onClick}>
        <div>{childrenText}</div>
      </ModalBackdrop>
    );

    const backdropElement = container.querySelector(".modal__backdrop");

    expect(backdropElement).toBeInTheDocument();

    fireEvent.click(backdropElement!);

    expect(onClick).toHaveBeenCalled();
  });
});
