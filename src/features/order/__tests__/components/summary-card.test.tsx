import { render, screen } from "@testing-library/react";

import { SummaryCard } from "../../components/summary-card/SummaryCard.component";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import { mockSummaryInfoData } from "../../__mocks__/components.mocks";

describe("SummaryCard test suite.", () => {
  test("Should render correctly when every props has data.", () => {
    render(<SummaryCard {...mockSummaryInfoData} />);

    const totalPriceElement = screen.getAllByText(
      `NT$ ${formatNumberWithCommas(
        Math.round(mockSummaryInfoData.final_total)
      )}`
    );
    const nameElement = screen.getByText(
      mockSummaryInfoData.userData.user.name
    );
    const telElement = screen.getByText(mockSummaryInfoData.userData.user.tel);
    const addressElement = screen.getByText(
      mockSummaryInfoData.userData.user.address
    );
    const emailElement = screen.getByText(
      mockSummaryInfoData.userData.user.email
    );

    expect(totalPriceElement).toHaveLength(2);
    expect(nameElement).toBeInTheDocument();
    expect(telElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });
});
