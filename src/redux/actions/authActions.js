// @flow
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { ApiUrls } from "../../constants/apiConstants";
import User from "../../models/User";
import { PaypalKeys } from "../../../secrets";
// import Sugar from "sugar";
// Sugar.extend();

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

export async function registerApi({ email, username, password }) {
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

export function* registerSaga({ info }) {
  try {
    let { error, cookie, user_id } = yield call(registerApi, info);
    yield put(
      error
        ? { type: "REGISTRATION_FAILURE", error }
        : {
            type: "REGISTRATION_SUCCESS",
            user: {
              username: info.username,
              email: info.email,
              userId: user_id,
              cookie
            }
          }
    );
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error: error.message(error) });
  }
}

export async function loginApi(creds) {
  const url = ApiUrls.login;
  const res = await axios.get(ApiUrls.login, { params: creds });
  return res.data;
}

export async function logoutApi() {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* loginSaga({ creds }) {
  try {
    const { error, ...user } = yield call(loginApi, creds);
    if (error) {
      yield put({ type: "LOGIN_FAILURE", error });
    } else {
      const newUser = fromJsonApi(user.user);
      yield put({
        type: "LOGIN_SUCCESS",
        // user
        user: { ...user, user: newUser }
      });
    }
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", error: error.message(error) });
  }
}

export function* logoutSaga() {
  try {
    // yield call(logoutApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error: error.message(error) });
  }
}

export default function* authSaga() {
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
