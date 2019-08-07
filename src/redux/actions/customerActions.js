// @flow
import type {
  CustomerState,
  CustomerAction,
  CustomerSearchParams
} from "../reducers/customerReducer";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Customer from "../../models/Customer";
import Review from "../../models/Review";
import type { Saga } from "redux-saga";

export function* createCustomerSaga({
  customer: cust
}: CreateArgs): Saga<void> {
  try {
    const { customer, error } = createCustomerApi(cust);
    if (customer) {
      yield put({
        type: "NEW_CUSTOMER_SUCCESS",
        customer: Customer.fromApi(customer)
      });
    } else if (error) {
      yield put({
        type: "NEW_CUSTOMER_FAILURE",
        error
      });
    }
  } catch (error) {
    yield put({
      type: "NEW_CUSTOMER_FAILURE",
      error
    });
  }
}

export function createCustomerApi(customer: Customer): Object {
  // Create an API-friendly payload
  const payload = Customer.toApi(customer);
  // Post using the online API and return the result
  // currently a dummy response (success)
  return { customer: payload };
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
}: CustomerSearchParams): Object[] {
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

export default function* customerSaga(): Saga<void> {
  yield all([
    yield takeEvery("NEW_CUSTOMER_START", createCustomerSaga),
    yield takeEvery("CUSTOMER_SEARCH_START", searchSaga),
    yield takeEvery("CUSTOMER_ADD_REVIEW_START", addReviewSaga)
  ]);
}

type CreateArgs = { customer: Customer };
type SearchArgs = {
  searchParams: CustomerSearchParams
};
type AddReviewArgs = { review: Review };
