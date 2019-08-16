// @flow
import * as Types from "../AuthTypes";
import { AsyncStorage } from "react-native";

export const initialState: Types.AuthState = {
  user: null,
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
    case "REGISTRATION_SUCCESS":
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        isLoading: false,
        error: null
      };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, isLoading: false, error: null };
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
    case "REGISTRATION_FAILURE":
    case "PAYMENT_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    case "PAYMENT_START":
      return { ...state, redirectUrl: null };
    case "PAYMENT_SUCCESS":
      return { ...state, redirectUrl: action.redirectUrl };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
export default authReducer;
