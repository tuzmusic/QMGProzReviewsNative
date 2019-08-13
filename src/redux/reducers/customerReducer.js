// @flow
import type {
  CustomerAction,
  CustomerState,
  CustomerCollection
} from "../CustomerTypes";

import Customer from "../../models/Customer";
import Review from "../../models/Review";

const logActionTypes = action =>
  action.type[0] !== "@" && console.log("CustomerReducer:", action.type);

const initialState: CustomerState = {
  customers: null,
  newItem: null,
  searchResults: null,
  error: null,
  isLoading: false
};

export default function customerReducer(
  state: CustomerState = initialState,
  action: CustomerAction
) {
  let customers: CustomerCollection;
  switch (action.type) {
    case "GET_CUSTOMERS_SUCCESS":
      return { ...state, customers: action.customers, isLoading: false };
    case "GET_CUSTOMERS_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    case "NEW_CUSTOMER_START":
    case "CUSTOMER_ADD_REVIEW_START":
      return { ...state, newItem: null, error: null, isLoading: true };
    case "NEW_CUSTOMER_SUCCESS":
      customers = {
        ...state.customers,
        [action.customer.id]: action.customer
      };
      return {
        ...state,
        customers,
        newItem: action.customer,
        isLoading: false
      };
    case "CUSTOMER_SEARCH_SUCCESS":
      return { ...state, searchResults: action.results, isLoading: false };
    case "CUSTOMER_ADD_REVIEW_SUCCESS":
      const newCustomer = customerWithReview(action.review);
      customers = {
        ...state.customers,
        [action.review.customerId]: newCustomer
      };
      // debugger;
      return {
        ...state,
        customers,
        newItem: newCustomer,
        isLoading: false
      };
    case "NEW_CUSTOMER_FAILURE":
    case "CUSTOMER_SEARCH_FAILURE":
    case "CUSTOMER_ADD_REVIEW_FAILURE":
      console.log("from reducer:", action.error);
      return {
        ...state,
        newItem: null,
        error: action.error,
        isLoading: false
      };
    case "CLEAR_NEW_ITEM":
      return { ...state, newItem: null };
    default:
      return state;
  }

  function customerWithReview(review: Review): Customer {
    if (!state.customers) {
      return new Customer();
    } else {
      const id: number = review.customerId;
      const oldCustomer: Customer = state.customers[id];
      const newReviews: Review[] = [review, ...oldCustomer.reviews];
      return Object.assign(oldCustomer, { reviews: newReviews });
    }
  }
}
