// @flow
import User from "../models/User";

export type AuthState = {
  user: ?User,
  userReady: ?boolean,
  isLoading: boolean,
  error: ?string,
  redirectUrl: ?string
};

export type RegisterApiPostParams = {
  email: string,
  username: string,
  password: string,
  passwordConfirmation?: string // not an api param but more efficient than adding a new type just for the form
};
export type LoginApiPostParams = {
  ["email" | "username"]: string,
  password: string
};

export type AuthAction =
  | LOGIN_START
  | LOGIN_SUCCESS
  | LOGIN_FAILURE
  | REGISTRATION_START
  | REGISTRATION_SUCCESS
  | REGISTRATION_FAILURE
  | LOGOUT_START
  | LOGOUT_SUCCESS
  | LOGOUT_FAILURE
  | PAYMENT_START
  | PAYMENT_SUCCESS
  | PAYMENT_FAILURE
  | SET_USER
  | CLEAR_ERROR;

export type PAYMENT_START = { type: "PAYMENT_START", amount: number };
export type PAYMENT_SUCCESS = { type: "PAYMENT_SUCCESS", redirectUrl: string };
export type PAYMENT_FAILURE = { type: "PAYMENT_FAILURE", error: string };

export type LOGIN_START = { type: "LOGIN_START" };
export type LOGOUT_START = { type: "LOGOUT_START" };
export type REGISTRATION_START = { type: "REGISTRATION_START" };
export type LOGIN_SUCCESS = { type: "LOGIN_SUCCESS", user: User };
export type REGISTRATION_SUCCESS = {
  type: "REGISTRATION_SUCCESS",
  user: User | Object // should fix this but whatever
};
export type SET_USER = { type: "SET_USER", user: User };
export type LOGOUT_SUCCESS = { type: "LOGOUT_SUCCESS" };
export type LOGIN_FAILURE = { type: "LOGIN_FAILURE", error: string };
export type LOGOUT_FAILURE = { type: "LOGOUT_FAILURE", error: string };
export type REGISTRATION_FAILURE = {
  type: "REGISTRATION_FAILURE",
  error: string
};
export type CLEAR_ERROR = { type: "CLEAR_ERROR" };
