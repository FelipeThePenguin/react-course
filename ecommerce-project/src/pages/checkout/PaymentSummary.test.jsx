import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

function Location() {
 const location = useLocation();

 return <div data-testid="url-path">{location.pathname}</div>
}

describe("PaymentSummary component", () => {
  let loadCart;
  let paymentSummary;
  let user; 

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

    user = userEvent.setup();
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

  it("clicks the place order button", async () => {
   render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );

    const placeOrderButton = screen.getByTestId("place-order-button");
    const urlPath = screen.getByTestId("url-path");
    await user.click(placeOrderButton);

    expect(loadCart).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(urlPath).toHaveTextContent('/orders');
  });
});
