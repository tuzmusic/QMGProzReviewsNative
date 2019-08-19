// #region IMPORTS
import React from "react";
import * as Types from "../src/redux/AuthTypes";
import { ApiUrls } from "../src/constants/apiConstants";
import { createPaymentResponse } from "../__mocks__/apiResponses/paypal";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { setupMockAdapter, setupPaypalMock } from "../__mocks__/axiosMocks";
import { GoogleMapsApiKey, PaypalKeys } from "../secrets";
import authSaga, {
  paymentApi,
  paymentSaga,
  registerSaga
} from "../src/redux/actions/authActions";
import SagaTester from "redux-saga-tester";
import authReducer, {
  initialState as initialAuthState
} from "../src/redux/reducers/authReducer";
import { startPayment } from "../src/redux/action-creators/authActionCreators";
import successHtml from "../__mocks__/apiResponses/PaypalSuccess";
import {
  render,
  fireEvent,
  waitForElement,
  debug
} from "react-native-testing-library";
import "@testing-library/jest-native/extend-expect";
import { RegisterForm } from "../src/subviews/RegisterForm";
import { Overlay } from "react-native-elements";
import WebView from "react-native-webview";
import PaymentModal from "../src/subviews/PaymentModal";
import { LoginView } from "../src/screens/LoginView";
import User from "../src/models/User";
// #endregion

describe("registration flow", () => {
  const mockProps = {
    login: jest.fn(),
    register: jest.fn(),
    clearError: jest.fn(),
    isLoading: false,
    user: new User(),
    error: null,
    navigation: {}
  };

  const wrapper = render(
    <React.Fragment>
      <LoginView testID="register-form" {...mockProps} />
    </React.Fragment>
  );

  describe('clicking "register"', () => {
    it("should show a spinner", () => {});
    describe("successful user reg", () => {
      it("should show the webview", () => {});
    });
    describe("user reg failure", () => {
      it("should show an error message", () => {
        // expect no webview
      });
    });
  });
});
