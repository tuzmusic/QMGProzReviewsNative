// @flow
import type { CustomerAction, CustomerState } from "../CustomerTypes";

import Customer from "../../models/Customer";
import Review from "../../models/Review";

const logActionTypes = action =>
  action.type[0] !== "@" && console.log("CustomerReducer:", action.type);

const initialState: CustomerState = {
  customers: null,
  addedItem: null,
  searchResults: null,
  error: null,
  isLoading: false
};

export default function customerReducer(
  state: CustomerState = initialState,
  action: CustomerAction
) {
  switch (action.type) {
    case "GET_CUSTOMERS_SUCCESS":
      return { ...state, customers: action.customers, isLoading: false };
    case "GET_CUSTOMERS_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    case "NEW_CUSTOMER_START":
    case "CUSTOMER_ADD_REVIEW_START":
      return { ...state, addedItem: null, error: null, isLoading: true };
    case "NEW_CUSTOMER_SUCCESS":
      console.log(action.customer);
      return {
        ...state,
        addedItem: action.customer,
        customers: {
          ...state.customers,
          [action.customer.id]: action.customer,
          isLoading: false
        }
      };
    case "CUSTOMER_SEARCH_SUCCESS":
      return { ...state, searchResults: action.results, isLoading: false };
    case "CUSTOMER_ADD_REVIEW_SUCCESS":
      const review = action.review;
      const id: number = review.customerId;
      const oldCustomer = state.customers[id];
      const newReviews = [review, ...oldCustomer.reviews];
      const newCustomer = new Customer({ ...oldCustomer, reviews: newReviews });
      const customers = { ...state.customers, [id]: newCustomer };
      debugger;
      return {
        ...state,
        customers,
        isLoading: false
      };
    case "NEW_CUSTOMER_FAILURE":
    case "CUSTOMER_SEARCH_FAILURE":
    case "CUSTOMER_ADD_REVIEW_FAILURE":
      console.log("from reducer:", action.error);
      return {
        ...state,
        addedItem: null,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
