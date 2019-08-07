// @flow
import Customer from "../models/Customer";
import Review from "../models/Review";

export type CustomerState = {
  +customers: { [key: number]: Customer },
  +currentCustomer: ?Customer,
  +searchResults: ?(Customer[]),
  +error: ?string
};

export type GET_CUSTOMERS_START = { type: "GET_CUSTOMERS_START" };
export type GET_CUSTOMERS_SUCCESS = {
  type: "GET_CUSTOMERS_SUCCESS",
  customers: Customer[]
};
export type GET_CUSTOMERS_FAIURE = { type: "GET_CUSTOMERS_FAIURE" };

export type NEW_CUSTOMER_START = {
  type: "NEW_CUSTOMER_START",
  customer: Customer
};
export type NEW_CUSTOMER_SUCCESS = {
  type: "NEW_CUSTOMER_SUCCESS",
  customer: Customer
};
export type NEW_CUSTOMER_FAILURE = {
  type: "NEW_CUSTOMER_FAILURE",
  error: string
};

export type CUSTOMER_SEARCH_SUCCESS = {
  type: "CUSTOMER_SEARCH_SUCCESS",
  results: Customer[]
};

export type CUSTOMER_SEARCH_FAILURE = {
  type: "CUSTOMER_SEARCH_FAILURE",
  error: string
};

export type CUSTOMER_ADD_REVIEW_SUCCESS = {
  type: "CUSTOMER_ADD_REVIEW_SUCCESS",
  review: Review
};
export type CUSTOMER_ADD_REVIEW_FAILURE = {
  type: "CUSTOMER_ADD_REVIEW_FAILURE",
  error: string
};

export type CustomerAction =
  | GET_CUSTOMERS_START
  | GET_CUSTOMERS_SUCCESS
  | GET_CUSTOMERS_FAIURE
  | NEW_CUSTOMER_START
  | NEW_CUSTOMER_SUCCESS
  | NEW_CUSTOMER_FAILURE
  | CUSTOMER_SEARCH_SUCCESS
  | CUSTOMER_SEARCH_FAILURE
  | CUSTOMER_ADD_REVIEW_SUCCESS
  | CUSTOMER_ADD_REVIEW_FAILURE;
