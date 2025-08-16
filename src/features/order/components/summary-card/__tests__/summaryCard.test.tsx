import { render, screen } from "@testing-library/react";

import { SummaryCard } from "../SummaryCard.component";

import { formatNumberWithCommas } from "../../../../../utils/common.utils";

describe("SummaryCard test suite.", () => {
  const mockData = {
    total: 2000,
    userData: {
      user: {
        name: "test",
        tel: "0000000000",
        address: "test address",
        email: "test@test.com",
      },
    },
  };
  test("Should render correctly when every props has data.", () => {
    render(<SummaryCard total={mockData.total} userData={mockData.userData} />);

    const totalPriceElement = screen.getAllByText(
      `NT$ ${formatNumberWithCommas(Math.round(mockData.total))}`
    );
    const nameElement = screen.getByText(mockData.userData.user.name);
    const telElement = screen.getByText(mockData.userData.user.tel);
    const addressElement = screen.getByText(mockData.userData.user.address);
    const emailElement = screen.getByText(mockData.userData.user.email);

    expect(totalPriceElement).toHaveLength(2);
    expect(nameElement).toBeInTheDocument();
    expect(telElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });
});
