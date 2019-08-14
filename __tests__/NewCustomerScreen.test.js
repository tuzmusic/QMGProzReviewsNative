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
import "@testing-library/jest-dom/extend-expect";

describe("NewCustomerScreen", () => {
  const component = render(<NewCustomerScreen />);
  describe("the basics", () => {
    it("renders the screen title", () => {
      expect(component.getByText("New Customer")).toBeDefined();
      expect(component.queryByText("Not there")).toBeNull();
    });

    const nameField = component.getByPlaceholder("Name");
    expect(nameField).toBeVisible();
    const descriptionField = component.getByPlaceholder("Description");
    it("updates the state from the name and description fields", () => {
      fireEvent.changeText(nameField, "John Doe");
      expect(nameField.props.value).toEqual("John Doe");
      fireEvent.changeText(descriptionField, "Some guy");
      expect(descriptionField.props.value).toEqual("Some guy");
    });
  });

  describe("address field", () => {
    const mock = new MockAdapter(axios);
    setupMapsMock(mock);
    const addressField = component.getByPlaceholder("Address");
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

    it("can clear", () => {
      fireEvent(addressField);
      expect(component.queryByText(mockString)).toBeNull();
    });
  });
});
