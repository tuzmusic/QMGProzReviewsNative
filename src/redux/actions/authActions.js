// @flow
import * as Types from "../AuthTypes";
import type { Saga } from "redux-saga";
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { ApiUrls } from "../../constants/apiConstants";
import User from "../../models/User";
import { PaypalKeys } from "../../../secrets";

export async function paymentApi(amount: number): Promise<string> {
  const url = ApiUrls.createPaypalPayment;
  const params = {
    amount,
    client_id: PaypalKeys.clientID,
    client_secret: PaypalKeys.clientSecret
  };
  const res = await axios.post(url, { params });
  const redirectUrl = res.data.links[1].href;
  return redirectUrl;
}

export function* paymentSaga(amount: number): Saga<void> {
  let action: Types.PAYMENT_FAILURE | Types.PAYMENT_SUCCESS;
  const redirectUrl = yield call(paymentApi, amount);
  try {
    action = { type: "PAYMENT_SUCCESS", redirectUrl };
  } catch (error) {
    action = { type: "PAYMENT_FAILURE", error: error.message };
  }
  yield put(action);
}

export async function registerApi({
  email,
  username,
  password
}: Types.RegisterApiPostParams): Promise<Object> {
  const nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
  if (!nonce) throw Error("Could not get nonce");
  const params = {
    username,
    email,
    nonce,
    display_name: username,
    user_pass: password
  };
  const res = await axios.get(ApiUrls.register, { params });
  return res.data;
}

export function* registerSaga({
  info
}: {
  info: Types.RegisterApiPostParams
}): Saga<void> {
  let action: Types.REGISTRATION_FAILURE | Types.REGISTRATION_SUCCESS;
  try {
    let { error, cookie, user_id } = yield call(registerApi, info);
    action = error
      ? { type: "REGISTRATION_FAILURE", error }
      : {
          type: "REGISTRATION_SUCCESS",
          user: {
            username: info.username,
            email: info.email,
            userId: user_id,
            cookie
          }
        };
  } catch (error) {
    action = { type: "REGISTRATION_FAILURE", error: error.message };
  }
  yield put(action);
}

export async function loginApi(creds: Types.LoginApiPostParams) {
  const url = ApiUrls.login;
  const res = await axios.get(ApiUrls.login, { params: creds });
  return res.data;
}

export async function logoutApi() {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* loginSaga({
  creds
}: {
  creds: Types.LoginApiPostParams
}): Saga<void> {
  let action: Types.LOGIN_FAILURE | Types.LOGIN_SUCCESS;
  try {
    const { error, ...user } = yield call(loginApi, creds);
    if (error) {
      action = { type: "LOGIN_FAILURE", error };
    } else {
      const newUser = User.fromJsonApi(user.user);
      action = {
        type: "LOGIN_SUCCESS",
        user: { ...user, user: newUser }
      };
    }
  } catch (error) {
    action = { type: "LOGIN_FAILURE", error: error.message };
  }
  yield put(action);
}

export function* logoutSaga(): Saga<void> {
  let action: Types.LOGOUT_FAILURE | Types.LOGOUT_SUCCESS;
  try {
    action = { type: "LOGOUT_SUCCESS" };
  } catch (error) {
    action = { type: "LOGOUT_FAILURE", error: error.message };
  }
  yield put(action);
}

export default function* authSaga(): Saga<void> {
  yield all([
    yield takeEvery("LOGIN_START", loginSaga),
    yield takeEvery("LOGOUT_START", logoutSaga),
    yield takeEvery("REGISTRATION_START", registerSaga)
  ]);
}

// ACTION CREATORS
export function clearError() {
  return { type: "CLEAR_ERROR" };
}

export function setUser(user) {
  return { type: "SET_USER", user };
}

export function login(creds) {
  return { type: "LOGIN_START", creds };
}

export function cancelLogin() {
  return { type: "LOGIN_FAILURE" };
}

export function logout() {
  return { type: "LOGOUT_START" };
}

export function register({ username, email, password }) {
  return { type: "REGISTRATION_START", info: { username, email, password } };
}
