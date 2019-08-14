import { AsyncStorage } from "react-native";

export const initialState = {
  stations: [],
  user: null,
  isLoading: false,
  error: null,
  users: {}
};

export default authReducer = (
  state = initialState,
  { user, users, error, ...action }
) => {
  // if (action.type[0] !== "@") console.log("AuthReducer:", action.type);
  switch (action.type) {
    case "LOGIN_START":
    case "LOGOUT_START":
    case "REGISTRATION_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
    case "REGISTRATION_SUCCESS":
    case "SET_USER":
      return {
        ...state,
        user,
        isLoading: false,
        error: null
      };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, isLoading: false, error: null };
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
    case "REGISTRATION_FAILURE":
      return { ...state, error, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
