import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiUrls } from "../src/constants/apiConstants";
import {
  loginResponse,
  registerResponse,
  registration
} from "./auth/authResponses";
import {
  customerIndexResponse,
  createCustomerResponse
} from "./apiResponses/customers";
import { postReviewResponse } from "./apiResponses/reviews";
import { createPaymentResponse } from "./apiResponses/paypal";
import { PaypalKeys } from "../secrets";

const DELAY = 500;

export function setupMockAdapter({
  customers = false,
  auth = false,
  letMeIn = true
}) {
  let mock = new MockAdapter(axios, { delayResponse: DELAY });
  if (customers || auth)
    console.log("WARNING: Using mock api - not connecting to the internet!");
  if (customers) setupCustomersMockAdapter(mock);
  if (auth) setupAuthMockAdapter(mock);
  if (letMeIn) setupLetMeIn(mock);

  setupMapsMock(mock);
  setupPaypalMock(mock);

  // mock.onAny().passThrough();
  return mock;
}

export function setupPaypalMock(mock) {
  const params = {
    amount: 10,
    client_id: PaypalKeys.clientID,
    client_secret: PaypalKeys.clientSecret
  };
  mock
    .onPost(ApiUrls.createPaypalPayment, { params })
    .reply(200, createPaymentResponse);
}

export function setupMapsMock(mock) {
  const mapsUrl =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const addresses = [
    "123 Mountain Road, Concord, NH, USA",
    "This is the mock map response"
  ].map((n, i) => ({
    description: n,
    id: i
  }));

  mock.onGet(mapsUrl).reply(200, { predictions: addresses });
}

function setupLetMeIn(mock) {
  mock
    .onGet(ApiUrls.login, {
      params: {
        username: "letmein",
        password: "123123"
      }
    })
    .reply(200, loginResponse.apiResponse);
}

export function setupAuthMockAdapter(mock) {
  mock
    // register
    .onGet(ApiUrls.nonce)
    .reply(200, registerResponse.nonce)
    .onGet(ApiUrls.register, {
      params: {
        username: "testuser1",
        email: "api1@prozreviews.com",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.success)
    .onGet(ApiUrls.register, {
      // params: registration.badUserApiParams
      params: {
        username: "testuser1dupe",
        email: "api1@prozreviews.com",
        nonce: "29a63be176",
        display_name: "testuser1dupe",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.usernameTaken)
    .onGet(ApiUrls.register, {
      // params: registration.badEmailApiParams
      params: {
        username: "testuser1",
        email: "api1@prozreviews.comdupe",
        nonce: "29a63be176",
        display_name: "testuser1",
        user_pass: "123123"
      }
    })
    .reply(200, registerResponse.emailTaken)
    // login
    .onGet(ApiUrls.login, {
      params: {
        username: "testuser1",
        password: "123123"
      }
    })
    .reply(200, loginResponse.apiResponse)
    .onGet(ApiUrls.login, {
      params: {
        email: "testuser@prozreviews.com",
        password: "123123"
      }
    })
    .reply(200, loginResponse.apiResponse)
    .onGet(ApiUrls.login)
    .reply(200, loginResponse.failure)
    // logout
    .onGet(ApiUrls.logout)
    .reply(200, loginResponse.logout);
}

export function setupCustomersMockAdapter(mock) {
  const params = {
    name: "Mr. Google",
    address: "123 Mountain Road, Concord, NH, USA"
    // description: "This dude knows everything!",
    // reviews: []
  };
  mock.onGet(ApiUrls.customers).reply(200, customerIndexResponse);
  mock.onPost(ApiUrls.customers, params).reply(200, createCustomerResponse);

  const reviewParams = {
    post_id: 15353,
    content: "review posted at 1565652383",
    user_id: 8,
    rating: 4
  };
  mock.onPost(ApiUrls.reviews, reviewParams).reply(200, postReviewResponse);
}
