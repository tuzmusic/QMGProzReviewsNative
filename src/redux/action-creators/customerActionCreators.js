// @flow

import * as Types from "../CustomerTypes";

import type Review from "../../models/Review";
import type Customer from "../../models/Customer";

export function searchCustomers(
  searchParams: Types.CustomerSearchParams
): Types.CUSTOMER_SEARCH_START {
  return {
    type: "CUSTOMER_SEARCH_START",
    searchParams
  };
}

export function addNewReview(review: Review): Types.CUSTOMER_ADD_REVIEW_START {
  return {
    type: "CUSTOMER_ADD_REVIEW_START",
    review
  };
}

export function createCustomer(customer: Customer): Types.NEW_CUSTOMER_START {
  return { type: "NEW_CUSTOMER_START", customer };
}

export function getCustomers(): Types.GET_CUSTOMERS_START {
  return { type: "GET_CUSTOMERS_START" };
}
