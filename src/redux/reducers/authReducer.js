// @flow
import * as Types from "../AuthTypes";
import { AsyncStorage } from "react-native";

export const initialState: Types.AuthState = {
  user: null,
  userReady: null,
  isLoading: false,
  error: null,
  redirectUrl: null
};

const authReducer = (
  state: Types.AuthState = initialState,
  action: Types.AuthAction
): Types.AuthState => {
  // if (action.type[0] !== "@") console.log("AuthReducer:", action.type);
  switch (action.type) {
    case "LOGIN_START":
    case "LOGOUT_START":
    case "REGISTRATION_START":
      return { ...state, isLoading: true, error: null, redirectUrl: null };
    case "LOGIN_SUCCESS":
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        userReady: true,
        isLoading: false,
        error: null
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        user: action.user,
        userReady: false, // needs payment
        isLoading: true, // show the same spinner until we have a redirectUrl
        error: null
      };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, isLoading: false, error: null };
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
    case "REGISTRATION_FAILURE":
    case "CREATE_PAYMENT_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    case "CREATE_PAYMENT_START":
      return { ...state, isLoading: true, redirectUrl: null };
    case "CREATE_PAYMENT_SUCCESS":
      return { ...state, redirectUrl: action.redirectUrl, isLoading: false };
    case "USER_PAYMENT_COMPLETE":
      return { ...state, isLoading: false, redirectUrl: null, userReady: true };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
export default authReducer;
