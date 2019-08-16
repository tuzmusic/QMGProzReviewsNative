// @flow
import React from "react";
import { ApiUrls } from "../src/constants/apiConstants";
import { createPaymentResponse } from "../__mocks__/apiResponses/paypal";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { setupMockAdapter, setupPaypalMock } from "../__mocks__/axiosMocks";
import { GoogleMapsApiKey, PaypalKeys } from "../secrets";
import { paymentApi } from "../src/redux/actions/authActions";
import SagaTester from "redux-saga-tester";

const mock = new MockAdapter(axios);
setupPaypalMock(mock);
const params = {
  amount: 10,
  client_id: PaypalKeys.clientID,
  client_secret: PaypalKeys.clientSecret
};
const url = ApiUrls.createPaypalPayment;

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
      const mockRedirectUrl =
        "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-17V121172D891330P";
      expect(await paymentApi(10)).toEqual(mockRedirectUrl);
    });
  });

  describe("paymentSaga", () => {
    xit("calls the paymentApi and dispatches an action with the redirectUrl", () => {});
    xit("can't be tested very well though. boo hoo.", () => {});
  });

  describe("reducer", () => {
    xit("takes a payment success action and writes the redirectUrl to the store", () => {});
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
