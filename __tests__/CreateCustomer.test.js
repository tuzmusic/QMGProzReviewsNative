// @flow
import customers from "../__mocks__/customers";
import reducer from "../src/redux/reducers/customerReducer";
import { createCustomer } from "../src/redux/action-creators/customerActionCreators";
import SagaTester from "redux-saga-tester";
import customerSaga, {
  createCustomerSaga
} from "../src/redux/actions/customerActions";
import recordSaga from "../recordSaga";
import Customer from "../src/models/Customer";

describe("creating a customer", () => {
  const existingCustomer = customers[2];
  const customerWithId = customers[1]; // Customer (id: 1)
  const { id, ...customerWithoutId } = customerWithId; // Object
  const startAction = {
    type: "NEW_CUSTOMER_START",
    customer: customerWithoutId
  };
  const successAction: Object = {
    type: "NEW_CUSTOMER_SUCCESS",
    customer: customerWithId
  };
  const initialState = {
    customers: { [existingCustomer.id]: existingCustomer },
    currentCustomer: null,
    searchResults: null,
    error: null
  };
  const stateWithNewCustomer = {
    ...initialState,
    currentCustomer: customerWithId,
    customers: {
      [existingCustomer.id]: existingCustomer,
      [customerWithId.id]: customerWithId
    }
  };

  describe("action creator", () => {
    it("creates a new customer start action", () => {
      const action = createCustomer(customerWithoutId);
      expect(action).toEqual(startAction);
    });
  });

  describe("reducer", () => {
    it("takes an add customer success action and returns the state with the new customer", () => {
      expect(reducer(initialState, successAction)).toEqual(
        stateWithNewCustomer
      );
    });
  });

  jest.spyOn(Customer, "fromApi").mockImplementation(customer => {
    return new Customer({ id: 1, ...customer });
  });

  describe("createCustomerSaga", () => {
    it("creates a new customer with a saga", async () => {
      const dispatched = await recordSaga(createCustomerSaga, startAction);
      expect(dispatched).toContainEqual(successAction);
    });
  });

  describe("integration", () => {
    let sagaStore;
    beforeEach(() => {
      sagaStore = new SagaTester({});
      sagaStore.start(customerSaga);
      jest.setTimeout(1000);
    });

    it("should create a customer and return the response", async () => {
      sagaStore.dispatch(startAction);
      await sagaStore.waitFor(successAction.type);
      expect(sagaStore.getCalledActions()).toEqual([
        startAction,
        successAction
      ]);
    });

    xit("fails if trying to create a customer who already exists (and then presents an interface for selecting the existing customer; adding a review, etc)", () => {});

    xit("returns a failure action if the API call fails", async () => {
      const createCustomerApi = jest.fn();
      createCustomerApi
        // jest.spyOn(null, "createCustomerApi")
        .mockImplementation(() => {
          console.log("hello from mock function");
          return { error: "Something went wrong" };
        });
      sagaStore.dispatch(startAction);
      await sagaStore.waitFor(successAction.type);
      // expect(createCustomerApi).toHaveBeenCalled();
      expect(sagaStore.getCalledActions()).toEqual([
        startAction,
        { type: "NEW_CUSTOMER_FAILURE", error: "Something went wrong" }
      ]);
    });
  });
});
