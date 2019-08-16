// @flow
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

const mock = new MockAdapter(axios);
setupPaypalMock(mock);
const params = {
  amount: 10,
  client_id: PaypalKeys.clientID,
  client_secret: PaypalKeys.clientSecret
};
const url = ApiUrls.createPaypalPayment;
const mockRedirectUrl =
  "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-17V121172D891330P";

describe("payment - setup", () => {
  describe("ApiUrl", () => {
    it("constructs the right url", () => {
      expect(ApiUrls.createPaypalPayment).toEqual(
        "https://www.prozreviews.com/wp-json/api/v2/create_payment"
      );
    });
  });

  describe("paypal mock", () => {
    it("responds to a post request with the mock response", async () => {
      const res = await axios.post(url, { params });
      expect(res.data).toEqual(createPaymentResponse);
    });
  });
});

describe("redux", () => {
  describe("paymentApi", () => {
    it("calls the paypal api and returns the redirect url for the payment", async () => {
      expect(await paymentApi(10)).toEqual(mockRedirectUrl);
    });
  });

  const startAction: Types.PAYMENT_START = {
    type: "PAYMENT_START",
    amount: 10
  };

  const successAction: Types.PAYMENT_SUCCESS = {
    type: "PAYMENT_SUCCESS",
    redirectUrl: mockRedirectUrl
  };

  const urlState = {
    ...initialAuthState,
    redirectUrl: mockRedirectUrl
  };

  describe("reducer", () => {
    it("sets the redirectUrl to null in response to a start action", () => {
      expect(authReducer(urlState, startAction)).toEqual(initialAuthState);
    });
    it("takes a payment success action and writes the redirectUrl to the store", () => {
      expect(authReducer(initialAuthState, successAction)).toEqual(urlState);
    });
  });

  describe("paymentSaga", () => {
    let sagaTester;
    beforeEach(() => {
      sagaTester = new SagaTester({
        initialState: initialAuthState,
        reducers: authReducer
      });
      sagaTester.start(authSaga);
      jest.setTimeout(1000);
    });

    it("calls the paymentApi and dispatches an action with the redirectUrl", async () => {
      sagaTester.dispatch(startPayment(10));
      expect(sagaTester.wasCalled("PAYMENT_START")).toBe(true);
      await sagaTester.waitFor(successAction.type);
      expect(sagaTester.getCalledActions()).toEqual([
        startAction,
        successAction
      ]);
      expect(sagaTester.getState()).toEqual(urlState);
    });
  });

  xdescribe("UI flow", () => {
    describe("register button press", () => {
      it("shows the webview with a spinner", () => {});
      it("starts the payment saga", () => {});
      it("navigates to the redirectUrl when the payment saga returns it", () => {});
    });
    describe("payment success", () => {
      it("hides the overlay", () => {});
      it("starts the actual registration registerSaga", () => {});
    });
    describe("payment failure", () => {
      it("hides the overlay", () => {});
      it("doesn't create a new user at all", () => {});
      it("reports an error", () => {});
    });
    describe("registration success", () => {
      it("creates a registered, subscribed user (more of a server thing, really)", () => {});
    });
  });
});
