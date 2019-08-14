import React from "react";
import { NewCustomerScreen } from "../src/screens/NewCustomerScreen";
import { render, fireEvent } from "react-native-testing-library";

describe("NewCustomerScreen", () => {
  const component = render(<NewCustomerScreen />);
  it("renders the screen title", () => {
    expect(component.getByText("New Customer")).toBeDefined();
    expect(component.queryByText("Not there")).toBeNull();
  });

  it("has fields for name, description, and address", () => {
    expect(component.getByPlaceholder("Name")).toBeDefined();
    expect(component.getByPlaceholder("Address")).toBeDefined();
    expect(component.getByPlaceholder("Description")).toBeDefined();
  });

  it("updates the state from the name and description fields", () => {
    const nameField = component.getByPlaceholder("Name");
    const descriptionField = component.getByPlaceholder("Description");
    fireEvent.changeText(nameField, "John Doe");
    expect(nameField.props.value).toEqual("John Doe");
    fireEvent.changeText(descriptionField, "Some guy");
    expect(descriptionField.props.value).toEqual("Some guy");
  });
});
