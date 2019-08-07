// @flow

import type {
  CustomerSearchParams,
  CustomerAction
} from "../reducers/customerReducer";
import type Review from "../../models/Review";
import type Customer from "../../models/Customer";

export function searchCustomers(
  searchParams: CustomerSearchParams
): CustomerAction {
  return {
    type: "CUSTOMER_SEARCH_START",
    searchParams
  };
}

export function addNewReview(review: Review): CustomerAction {
  return {
    type: "CUSTOMER_ADD_REVIEW_START",
    review
  };
}

export function createCustomer(customer: Customer): CustomerAction {
  return { type: "NEW_CUSTOMER_START", customer };
}
