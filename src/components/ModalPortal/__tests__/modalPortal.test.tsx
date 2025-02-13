import { render, screen, fireEvent } from "@testing-library/react";
import ModalPortal from "../ModalPortal.component";

const onClick = jest.fn();

describe("ModalPortal test suite.", () => {
  test("Should renders children inside the portal.", () => {
    const childrenText = "test";

    render(
      <ModalPortal backdropClose={onClick}>
        <div>{childrenText}</div>
      </ModalPortal>
    );

    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });

  test("Should calls backdropClose callback when backdrop is clicked.", async () => {
    const childrenText = "test";

    render(
      <ModalPortal backdropClose={onClick}>
        <div>{childrenText}</div>
      </ModalPortal>
    );

    const backdropElement = document
      .getElementById("overlays")
      ?.querySelector(".modal__backdrop");

    expect(backdropElement).toBeInTheDocument();

    await fireEvent.click(backdropElement!);

    expect(onClick).toHaveBeenCalled();
  });
});
