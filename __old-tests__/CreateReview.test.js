// @flow
import reducer from "../src/redux/reducers/customerReducer";
import customers from "../__mocks__/customers";
import users from "../__mocks__/users";
import Review from "../src/models/Review";
import Customer from "../src/models/Customer";
import SagaTester from "redux-saga-tester";
import customerSaga, {
  addReviewSaga
} from "../src/redux/actions/customerActions";
import recordSaga from "../recordSaga";

const customer = customers[1];
const review = new Review({
  id: 10,
  content: "A mock review",
  rating: 4,
  customerId: customer.id,
  date: "2019-06-12T23:19:50.639Z",
  user: users[1]
});
const initialState = {
  customers: { [customer.id]: customer },
  currentCustomer: customer,
  error: null,
  searchResults: null
};

const customerWithReview = new Customer({
  ...customer,
  reviews: [...customer.reviews, review]
});
const stateWithReview = {
  ...initialState,
  customers: { [customerWithReview.id]: customerWithReview }
};
const startAction = {
  type: "CUSTOMER_ADD_REVIEW_START",
  review
};
const successAction = {
  type: "CUSTOMER_ADD_REVIEW_SUCCESS",
  review
  // customer: customerWithReview
};

describe("creating a review", () => {
  describe("reducer", () => {
    it("takes a submit review succcess action and returns the state with the updated customer", () => {
      expect(reducer(initialState, successAction)).toEqual(stateWithReview);
    });
  });

  describe("addReviewSaga", () => {
    it("adds a review to a customer with a saga", async () => {
      const dispatched = await recordSaga(addReviewSaga, startAction);
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
    it("should perform a search and deliver the results", async () => {
      sagaStore.dispatch(startAction);
      await sagaStore.waitFor(successAction.type);
      expect(sagaStore.getCalledActions()).toEqual([
        startAction,
        successAction
      ]);
    });
  });
});

describe("creating a review from the CustomerScreen", () => {
  xit("assigns the current user to the review. (complicated test involving mock stores etc.)", () => {});
});
