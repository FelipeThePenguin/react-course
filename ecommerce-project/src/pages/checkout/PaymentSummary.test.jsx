import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    paymentSummary = {
      totalItems: 1,
      productCostCents: 1899,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 1899,
      taxCents: 190,
      totalCostCents: 2089,
    };
  });

  it("displays the payment summary", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productCostRow = screen.getByTestId("product-cost-row");
    const shippingCostRow = screen.getByTestId("shipping-cost-row");
    const totalCostBeforeTaxRow = screen.getByTestId("total-cost-before-tax-row",);
    const taxCostRow = screen.getByTestId("tax-cost-row");
    const totalCostRow = screen.getByTestId("total-cost-row");

    expect(productCostRow).toHaveTextContent("$18.99");
    expect(shippingCostRow).toHaveTextContent("$0.00");
    expect(totalCostBeforeTaxRow).toHaveTextContent("$18.99");
    expect(taxCostRow).toHaveTextContent("$1.90");
    expect(totalCostRow).toHaveTextContent("$20.89");
  });
});
