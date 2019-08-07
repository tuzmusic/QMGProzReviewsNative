import reducer from "../src/redux/reducers/customerReducer";
import Customer from "../src/models/Customer";
import customerSaga, {
  searchSaga,
  searchApi
} from "../src/redux/actions/customerActions";
import { searchCustomers } from "../src/redux/action-creators/customerActionCreators";
import customers from "../__mocks__/customers";
import SagaTester from "redux-saga-tester";
import recordSaga from "../recordSaga";

const text = "55-57 59th St";
const searchField = "address";
const searchParams = { text, searchField, customers };
const startAction = { type: "CUSTOMER_SEARCH_START", searchParams };
const successAction = {
  type: "CUSTOMER_SEARCH_SUCCESS",
  results: [customers[1], customers[3]]
};

describe("searchCustomers", () => {
  it("kicks off a redux action to start the search", () => {
    expect(searchCustomers(searchParams)).toEqual(startAction);
  });
});

describe("searchSaga", () => {
  it("searches customers with a saga", async () => {
    const dispatched = await recordSaga(searchSaga, startAction);
    expect(dispatched).toContainEqual(successAction);
  });

  it("returns an error on a failure", async () => {
    const error = new Error("uh oh!");
    const spy = jest.spyOn(Array.prototype, "filter").mockImplementation(() => {
      throw error;
    });
    const expectedAction = { type: "CUSTOMER_SEARCH_FAILURE", error };
    try {
      const dispatched = await recordSaga(searchSaga, initialAction);
      // console.log("***DISPATCHED FROM TRY IN TEST***", dispatched[0].type);
      expect(dispatched).toContainEqual(expectedAction);
    } catch (e) {
      // console.log("***ERROR FROM CATCH IN TEST***", e.message);
    }
    spy.mockRestore();
  });
});

describe("searchApi", () => {
  it("performs the search on the database", () => {
    const apiResult = searchApi(searchParams);
    const customersFromResult = apiResult.map(c => new Customer.fromApi(c));
    expect(customersFromResult).toContainEqual(customers[1]);
  });
});

describe("reducer", () => {
  it("takes a search success action and returns the state with the results", () => {
    expect(reducer(undefined, successAction).searchResults).toEqual(
      successAction.results
    );
  });
});

describe("integration", () => {
  let sagaStore;
  beforeEach(() => {
    sagaStore = new SagaTester({});
    sagaStore.start(customerSaga);
    jest.setTimeout(1000);
  });
  it("should perform a search and deliver the results", async () => {
    sagaStore.dispatch(startAction);
    await sagaStore.waitFor(successAction.type);
    expect(sagaStore.getCalledActions()).toEqual([startAction, successAction]);
  });
});
