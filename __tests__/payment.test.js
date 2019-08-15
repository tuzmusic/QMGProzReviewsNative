// @flow
import React from "react";
import { ApiUrls } from "../src/constants/apiConstants";
import { createPaymentResponse } from "../__mocks__/apiResponses/paypal";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { setupMockAdapter, setupPaypalMock } from "../__mocks__/axiosMocks";
import { GoogleMapsApiKey, PaypalKeys } from "../secrets";
import { paymentApi } from "../src/redux/actions/authActions";

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

describe("api functions", () => {
  describe("paymentApi", () => {
    it("calls the paypal api and returns the redirect url for the payment", async () => {
      const mockRedirectUrl =
        "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-17V121172D891330P";
      expect(await paymentApi(10)).toEqual(mockRedirectUrl);
    });
  });
});
