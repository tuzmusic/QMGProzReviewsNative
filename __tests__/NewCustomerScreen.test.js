// @flow
import React from "react";
import { NewCustomerScreen } from "../src/screens/NewCustomerScreen";
import {
  render,
  fireEvent,
  waitForElement,
  debug
} from "react-native-testing-library";
import { setupMapsMock } from "../__mocks__/axiosMocks";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-native/extend-expect";
import User from "../src/models/User";
import Customer from "../src/models/Customer";

describe("NewCustomerScreen", () => {
  const mockProps = {
    currentCustomer: new Customer(),
    error: "",
    user: new User(),
    createCustomer: jest.fn()
  };
  const component = render(<NewCustomerScreen {...mockProps} />);
  const nameField = component.getByPlaceholder("Name");
  const addressField = component.getByPlaceholder("Address");
  const saveButton = component.getByText("Save Customer");
  // const descriptionField = component.getByPlaceholder("Description");

  describe("the basics", () => {
    it("renders the screen title, fields and buttons", () => {
      expect(component.getByText("New Customer")).toBeDefined();
      expect(component.queryByText("Not there")).toBeNull();
      expect(nameField).toBeDefined();
      expect(addressField).toBeDefined();
      expect(saveButton).toBeDefined();
    });

    // expect(nameField).toBeVisible();
    it("updates the state from the name and description fields", () => {
      fireEvent.changeText(nameField, "John Doe");
      expect(nameField.props.value).toEqual("John Doe");
      // fireEvent.changeText(descriptionField, "Some guy");
      // expect(descriptionField.props.value).toEqual("Some guy");
    });
  });

  describe("address field", () => {
    const mock = new MockAdapter(axios);
    setupMapsMock(mock);
    const mockAddress = "123 Mountain Road, Concord, NH, USA";
    const mockString = "This is the mock map response";

    let result;
    beforeEach(async () => {
      fireEvent.changeText(addressField, "123");
      result = await waitForElement(() => component.getByText(mockAddress));
    });

    it("shows map results for searching", async () => {
      expect(result).toBeDefined();
      expect(component.getByText(mockString)).toBeDefined();
    });

    it("pressing a selection clears the predictions and sets the address field's value to the full address selected", async () => {
      fireEvent.press(result);
      expect(component.queryByText(mockString)).toBeNull();
      expect(addressField.props.value).toEqual(mockAddress);
    });
  });

  describe("errors", () => {
    xit("should show an error if the name is absent", async () => {
      fireEvent.changeText(nameField, "");
      fireEvent.press(saveButton);
      const message = await waitForElement(() =>
        component.getByText("Please enter a name.")
      );
      expect(message).toExist();
    });
  });
});
