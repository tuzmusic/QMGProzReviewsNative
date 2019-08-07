import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiUrls } from "../src/constants/apiConstants";
import {
  loginResponse,
  registerResponse,
  registration
} from "./auth/authResponses";

const DELAY = 1000;

export function setupMockAdapter({
  customers = false,
  auth = false,
  letMeIn = true
}) {
  let mock = new MockAdapter(axios, { delayResponse: DELAY });
  if (customers || auth)
    console.log("WARNING: Using mock api - not connecting to the internet!");
  // if (customers) setupCustomersMockAdapter(mock);
  if (auth) setupAuthMockAdapter(mock);
  if (letMeIn) setupLetMeIn(mock);
  mock.onAny().passThrough();
  return mock;
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
  mock.onGet();
}
