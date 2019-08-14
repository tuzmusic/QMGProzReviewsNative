import React from "react";
import { NewCustomerScreen } from "../src/screens/NewCustomerScreen";
import { render, fireEvent } from "react-native-testing-library";

describe("NewCustomerScreen", () => {
  const { getByText } = render(<NewCustomerScreen />);
  it("renders the screen title", () => {
    expect(getByText("New Customer")).toBeDefined();
    expect(true).toBe(true);
  });
});
