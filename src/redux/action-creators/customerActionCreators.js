// @flow

import * as Types from "../CustomerTypes";
import * as RevTypes from "../ReviewTypes";

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

export function addNewReview(
  review: RevTypes.ReviewFormObject
): Types.CUSTOMER_ADD_REVIEW_START {
  return {
    type: "CUSTOMER_ADD_REVIEW_START",
    review
  };
}

export function createCustomer(
  customerInfo: Types.CustomerApiPostPayload
): Types.NEW_CUSTOMER_START {
  return { type: "NEW_CUSTOMER_START", customerInfo };
}

export function getCustomers(): Types.GET_CUSTOMERS_START {
  return { type: "GET_CUSTOMERS_START" };
}

export function clearNewItem(): Types.CLEAR_NEW_ITEM {
  return { type: "CLEAR_NEW_ITEM" };
}
