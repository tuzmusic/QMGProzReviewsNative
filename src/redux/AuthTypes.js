// @flow
import User from "../models/User";

export type AuthState = {
  user: ?User,
  isLoading: boolean,
  error: ?string
};

export type RegisterApiPostParams = {
  email: string,
  username: string,
  password: string
};
export type LoginApiPostParams = {
  email?: string,
  username?: string,
  password: string
};

export type AuthAction =
  | LOGIN_START
  | LOGOUT_START
  | REGISTRATION_START
  | LOGIN_SUCCESS
  | REGISTRATION_SUCCESS
  | SET_USER
  | LOGOUT_SUCCESS
  | LOGIN_FAILURE
  | LOGOUT_FAILURE
  | REGISTRATION_FAILURE
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
