// @flow
import * as Types from "../AuthTypes";
import User from "../../models/User";

export function startPayment(amount: number): Types.CREATE_PAYMENT_START {
  return { type: "CREATE_PAYMENT_START", amount };
}

// ACTION CREATORS
export function clearError(): Types.CLEAR_ERROR {
  return { type: "CLEAR_ERROR" };
}

export function setUser(user: User): Types.SET_USER {
  return { type: "SET_USER", user };
}

export function login(creds: Types.LoginApiPostParams): Types.LOGIN_START {
  return { type: "LOGIN_START", creds };
}

export function cancelLogin(): Types.LOGIN_FAILURE {
  return { type: "LOGIN_FAILURE", error: "Login cancelled." };
}

export function logout(): Types.LOGOUT_START {
  return { type: "LOGOUT_START" };
}

export function register({
  username,
  email,
  password
}: Types.RegisterApiPostParams): Types.REGISTRATION_START {
  return { type: "REGISTRATION_START", info: { username, email, password } };
}
