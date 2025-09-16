import { render, fireEvent } from "@testing-library/react";

import { Indicator } from "../indicator/Indicator.component";

describe("Indicator test suite.", () => {
  test("Renders the correct number of dots.", () => {
    const { container } = render(
      <Indicator imgCount={4} imgNum={1} onChangeImg={() => {}} />
    );

    const dots = container.querySelectorAll(".indicator__dots");
    expect(dots.length).toBe(4);
  });

  test("Applies the active class to the active dot.", () => {
    const onChangeImg = jest.fn();
    const { container } = render(
      <Indicator imgCount={4} imgNum={2} onChangeImg={onChangeImg} />
    );

    const dots = container.querySelectorAll(".indicator__dots");

    dots.forEach((dot, index) => {
      if (index === 2) {
        expect(dot).toHaveClass("indicator__dots--active");
      } else {
        expect(dot).not.toHaveClass("indicator__dots--active");
      }
    });
  });

  test("Calls onChangeImg with the correct index when a dot is clicked.", () => {
    const onChangeImg = jest.fn();
    const { container } = render(
      <Indicator imgCount={3} imgNum={0} onChangeImg={onChangeImg} />
    );

    const dots = container.querySelectorAll(".indicator__dots");

    fireEvent.click(dots[1]!);

    expect(onChangeImg).toHaveBeenCalledTimes(1);
    expect(onChangeImg).toHaveBeenCalledWith(1);
  });
});
