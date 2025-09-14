import { render, screen, fireEvent } from "@testing-library/react";

import { Pagination } from "../pagination/Pagination.component";

describe("Pagination test suite.", () => {
  const onClick = jest.fn();

  beforeEach(() => onClick.mockClear());

  test("Should render correct number of page items and marks active page.", () => {
    render(
      <Pagination onChangePage={onClick} pageCount={20} currentPage={4} />
    );

    const pageItems = screen.getAllByRole("link");

    expect(pageItems).toHaveLength(20);
    expect(pageItems[3]).toHaveClass("pagination__item-btn--active");
  });

  test("Should disabled previous button on first page.", () => {
    render(<Pagination onChangePage={onClick} pageCount={5} currentPage={1} />);

    const prevButton = screen.getByLabelText("Previous");

    expect(prevButton).toBeDisabled();
  });

  test("Should disabled next button on last page.", () => {
    render(<Pagination onChangePage={onClick} pageCount={5} currentPage={5} />);

    const prevButton = screen.getByLabelText("Next");

    expect(prevButton).toBeDisabled();
  });

  test("Should call onChangePage when clicking a page number.", () => {
    render(<Pagination onChangePage={onClick} pageCount={5} currentPage={2} />);

    const pageLink = screen.getByText("4");
    fireEvent.click(pageLink);

    expect(onClick).toHaveBeenCalledWith(4);
  });

  test("Should call onChangePage with currentPage - 1 when clicking previous button.", () => {
    render(<Pagination onChangePage={onClick} pageCount={5} currentPage={3} />);

    const prevButton = screen.getByRole("button", { name: "Previous" });
    fireEvent.click(prevButton);
    expect(onClick).toHaveBeenCalledWith(2);
  });

  test("Should call onChangePage with currentPage + 1 when clicking next button.", () => {
    render(<Pagination onChangePage={onClick} pageCount={5} currentPage={3} />);

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    expect(onClick).toHaveBeenCalledWith(4);
  });
});
