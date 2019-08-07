// @flow
import type { CustomerAction, CustomerState } from "../CustomerTypes";

import Customer from "../../models/Customer";
import Review from "../../models/Review";
import customers from "../../../__mocks__/customers";
function logActionTypes(action) {
  if (action.type[0] !== "@") console.log("CustomerReducer:", action.type);
}
const initialState = {
  customers: null,
  currentCustomer: customers[0],
  searchResults: null,
  error: null
};

export default function customerReducer(
  state: CustomerState = initialState,
  action: CustomerAction
) {
  // logActionTypes(action);
  switch (action.type) {
    case "GET_CUSTOMERS_SUCCESS":
      console.log("Got customers:", action.customers);
      return { ...state, customers: action.customers };
    case "GET_CUSTOMERS_FAILURE":
      return { ...state, error: action.error };
    case "NEW_CUSTOMER_START":
      return { ...state, currentCustomer: null, error: null };
    case "NEW_CUSTOMER_SUCCESS":
      return {
        ...state,
        currentCustomer: action.customer,
        customers: { ...state.customers, [action.customer.id]: action.customer }
      };
    case "CUSTOMER_SEARCH_SUCCESS":
      return { ...state, searchResults: action.results };
    case "CUSTOMER_ADD_REVIEW_SUCCESS":
      const review = action.review;
      const id = review.customerId;
      const oldCustomer = state.customers[id];
      const newReviews = [...oldCustomer.reviews, review];
      const newCustomer = new Customer({ ...oldCustomer, reviews: newReviews });
      return {
        ...state,
        customers: { ...state.customers, [id]: newCustomer }
      };
    case "NEW_CUSTOMER_FAILURE":
    case "CUSTOMER_SEARCH_FAILURE":
    case "CUSTOMER_ADD_REVIEW_FAILURE":
      return { ...state, currentCustomer: null, error: action.error };
    default:
      return state;
  }
}
