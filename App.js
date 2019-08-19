import React, { Component } from "react";
import AppContainer from "./src/containers-navigators/AppContainer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import customerSaga from "./src/redux/actions/customerActions";
import authSaga from "./src/redux/actions/authActions";
import customerReducer from "./src/redux/reducers/customerReducer";
import authReducer from "./src/redux/reducers/authReducer";
import {
  setupMockAdapter,
  setupProductionAdapter,
  setupPaypalMock
} from "./__mocks__/axiosMocks";
import { all } from "redux-saga/effects";
import { DEV_MODE } from "./src/constants/DEV_MODE";

const combinedReducer = combineReducers({ customerReducer, authReducer });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

if (!__DEV__ || !DEV_MODE) setupProductionAdapter();
if (DEV_MODE) setupMockAdapter();

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

function* rootSaga() {
  sagaMiddleware.run(authSaga);
  sagaMiddleware.run(customerSaga);
}
