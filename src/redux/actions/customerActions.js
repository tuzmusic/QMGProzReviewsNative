// @flow
import * as Types from "../CustomerTypes";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Customer from "../../models/Customer";
import Review from "../../models/Review";
import type { Saga } from "redux-saga";
import { createCustomerApi } from "./customersApi";

export function* createCustomerSaga({
  customerInfo
}: Types.NEW_CUSTOMER_START): Saga<void> {
  let action: Types.NEW_CUSTOMER_SUCCESS | Types.NEW_CUSTOMER_FAILURE;
  try {
    const data = yield call(createCustomerApi, customerInfo); // post request returns the new customer info
    const customer = Customer.fromApi(data); // convert to customer object
    action = { type: "NEW_CUSTOMER_SUCCESS", customer };
  } catch (error) {
    action = { type: "NEW_CUSTOMER_FAILURE", error: error.message };
  }
  yield put(action);
}

export function* searchSaga({ searchParams }: SearchArgs): Saga<void> {
  try {
    // TO-DO: Check API response for failure!
    const results = searchApi(searchParams);
    yield put({
      type: "CUSTOMER_SEARCH_SUCCESS",
      results
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_SEARCH_FAILURE",
      error
    });
  }
}

export function searchApi({
  text,
  customers,
  searchField
}: Types.CustomerSearchParams): Object[] {
  // Perform search using online API
  const results = Object.values(customers).filter(
    (c: Object) => c[searchField] === text
  );
  // Convert API results to Customer objects
  return results.map(c => Customer.fromApi(c));
}

export function* addReviewSaga({ review }: AddReviewArgs): Saga<void> {
  try {
    // TO-DO: Check API response for failure!
    const newReview = addReviewApi(review);
    yield put({
      type: "CUSTOMER_ADD_REVIEW_SUCCESS",
      review: newReview
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_ADD_REVIEW_FAILURE",
      error
    });
  }
}

export function addReviewApi(review: Review) {
  // Update the customer (with the new review) using online API
  // Or possibly create the review using online API

  const result = review;
  // The API should return the customer (or the review, which would be dealt with differently)
  // Convert API result to Customer object
  return Review.fromApi(result);
}

import { getCustomersSaga } from "./customerActions2";
export default function* customerSaga(): Saga<void> {
  yield all([
    yield takeEvery("NEW_CUSTOMER_START", createCustomerSaga),
    yield takeEvery("CUSTOMER_SEARCH_START", searchSaga),
    yield takeEvery("CUSTOMER_ADD_REVIEW_START", addReviewSaga),
    yield takeEvery("GET_CUSTOMERS_START", getCustomersSaga)
  ]);
}

type CreateArgs = { customer: Customer };
type SearchArgs = {
  searchParams: Types.CustomerSearchParams
};
type AddReviewArgs = { review: Review };
