// @flow

import Customer from "../../models/Customer";
import Review from "../../models/Review";
import customers from "../../../__mocks__/customers";
function logActionTypes(action) {
  if (action.type[0] !== "@") console.log("CustomerReducer:", action.type);
}
const initialState = {
  customers: customers || {},
  currentCustomer: customers[0],
  searchResults: null,
  error: null
};

export default function customerReducer(
  state: CustomerState = initialState,
  action: CustomerAction
) {
  // logActionTypes(action)
  switch (action.type) {
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
      const custId = review.customerId;
      const oldCustomer = state.customers[custId];
      const newReviews = [...oldCustomer.reviews, review];
      const newCustomer = new Customer({ ...oldCustomer, reviews: newReviews });
      return {
        ...state,
        customers: { ...state.customers, [custId]: newCustomer }
      };
    case "NEW_CUSTOMER_FAILURE":
    case "CUSTOMER_SEARCH_FAILURE":
    case "CUSTOMER_ADD_REVIEW_FAILURE":
      return { ...state, currentCustomer: null, error: action.error };
    default:
      return state;
  }
}

export type CustomerState = {
  +customers: { [key: number]: Customer },
  +currentCustomer: ?Customer,
  +searchResults: ?(Customer[]),
  +error: ?string
};

export type CustomerAction =
  | CustomerSearchAction
  | CustomerReviewAction
  | CustomerNewAction;

export type CustomerSearchParams = {
  text: string,
  searchField: string,
  customers?: { [key: number]: Customer }
};

type CustomerNewAction =
  | {
      type: "NEW_CUSTOMER_START",
      customer: Customer
    }
  | {
      type: "NEW_CUSTOMER_SUCCESS",
      customer: Customer
    }
  | {
      type: "NEW_CUSTOMER_FAILURE",
      error: string
    };

type CustomerSearchAction =
  | {
      type: "CUSTOMER_SEARCH_START",
      searchParams: CustomerSearchParams
    }
  | {
      type: "CUSTOMER_SEARCH_SUCCESS",
      results: Customer[]
    }
  | {
      type: "CUSTOMER_SEARCH_FAILURE",
      error: string
    };

type CustomerReviewAction =
  | {
      type: "CUSTOMER_ADD_REVIEW_START",
      review: Review
    }
  | {
      type: "CUSTOMER_ADD_REVIEW_SUCCESS",
      review: Review
    }
  | {
      type: "CUSTOMER_ADD_REVIEW_FAILURE",
      error: string
    };
