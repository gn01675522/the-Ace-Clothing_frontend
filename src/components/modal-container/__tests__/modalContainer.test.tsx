import { render, screen, fireEvent } from "@testing-library/react";
import { ModalContainer } from "../ModalContainer.component";

const onClick = jest.fn();

describe("ModalContainer test suite.", () => {
  test("Should renders children inside the portal.", () => {
    const childrenText = "test";

    render(
      <ModalContainer backdropClose={onClick}>
        <div>{childrenText}</div>
      </ModalContainer>
    );

    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });

  test("Should calls backdropClose callback when backdrop is clicked.", () => {
    const childrenText = "test";

    render(
      <ModalContainer backdropClose={onClick}>
        <div>{childrenText}</div>
      </ModalContainer>
    );

    const backdropElement = document
      .getElementById("overlays")
      ?.querySelector(".modal__backdrop");

    expect(backdropElement).toBeInTheDocument();

    fireEvent.click(backdropElement!);

    expect(onClick).toHaveBeenCalled();
  });
});
