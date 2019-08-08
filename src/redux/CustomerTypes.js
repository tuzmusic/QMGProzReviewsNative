// @flow
import Customer from "../models/Customer";
import Review from "../models/Review";

export type CustomerCollection = { [number]: Customer };

export type CustomerState = {
  +customers: ?CustomerCollection,
  +currentCustomer: ?Customer,
  +searchResults: ?(Customer[]),
  +error: ?string
};

export type CustomerApiGetPayload = {
  id: number,
  title: string,
  description: string,
  address: string,
  location: { latitude: string, longitude: string },
  galleryImage: { url: string },
  owner: {
    id: ?number,
    username: ?string,
    email: ?string,
    url: ?string,
    registered: ?string,
    firstName: ?string,
    lastName: ?string,
    description: ?string,
    capabilities: ?Object,
    avatar: string
  }
};

export type CustomerApiPostPayload = {
  name: string,
  description: string,
  address: string,
  location?: { longitude: number, latitude: number },
  review?: Review[]
};

export type CustomerSearchParams = {
  text: string,
  searchField: string,
  customers: CustomerCollection
};

export type GET_CUSTOMERS_START = { type: "GET_CUSTOMERS_START" };
export type GET_CUSTOMERS_SUCCESS = {
  type: "GET_CUSTOMERS_SUCCESS",
  customers: CustomerCollection
};
export type GET_CUSTOMERS_FAILURE = {
  type: "GET_CUSTOMERS_FAILURE",
  error: string
};

export type NEW_CUSTOMER_START = {
  type: "NEW_CUSTOMER_START",
  customerInfo: CustomerApiPostPayload
};
export type NEW_CUSTOMER_SUCCESS = {
  type: "NEW_CUSTOMER_SUCCESS",
  customer: Customer
};
export type NEW_CUSTOMER_FAILURE = {
  type: "NEW_CUSTOMER_FAILURE",
  error: string
};

export type CUSTOMER_SEARCH_START = {
  type: "CUSTOMER_SEARCH_START",
  searchParams: CustomerSearchParams
};

export type CUSTOMER_SEARCH_SUCCESS = {
  type: "CUSTOMER_SEARCH_SUCCESS",
  results: Customer[]
};

export type CUSTOMER_SEARCH_FAILURE = {
  type: "CUSTOMER_SEARCH_FAILURE",
  error: string
};

export type CUSTOMER_ADD_REVIEW_START = {
  type: "CUSTOMER_ADD_REVIEW_START",
  review: Review
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
  | GET_CUSTOMERS_FAILURE
  | NEW_CUSTOMER_START
  | NEW_CUSTOMER_SUCCESS
  | NEW_CUSTOMER_FAILURE
  | CUSTOMER_SEARCH_SUCCESS
  | CUSTOMER_SEARCH_FAILURE
  | CUSTOMER_ADD_REVIEW_SUCCESS
  | CUSTOMER_ADD_REVIEW_FAILURE;
