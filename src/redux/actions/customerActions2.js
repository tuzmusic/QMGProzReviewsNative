// @flow
import * as Types from "../CustomerTypes";
import { call, put, select, takeEvery, all } from "redux-saga/effects";
import Customer from "../../models/Customer";
import Review from "../../models/Review";
import type { Saga } from "redux-saga";
import { getCustomersApi } from "./customersApi";

export function* getCustomersSaga(): Saga<void> {
  let action: Types.GET_CUSTOMERS_SUCCESS | Types.GET_CUSTOMERS_FAILURE;
  try {
    const data = yield call(getCustomersApi);
    const customersArray = data.map(c => Customer.fromApi(c));
    const customers = Customer.CollectionFromArray(customersArray);
    action = { type: "GET_CUSTOMERS_SUCCESS", customers };
  } catch (error) {
    console.log(error);
    action = { type: "GET_CUSTOMERS_FAILURE", error: error.message };
  }
  yield put(action);
}
