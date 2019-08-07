import React, { Component } from "react";
import CustomerSearchResultScreen from "../screens/CustomerSearchResultScreen";

class CustomerSearchResultScreenContainer extends Component {
  onCustomerClick(customer) {
    this.props.navigation.navigate("Customer", { customer });
  }

  render() {
    const results = this.props.navigation.getParam("results");

    return (
      <CustomerSearchResultScreen
        results={results}
        onCustomerClick={this.onCustomerClick.bind(this)}
      />
    );
  }
}

export default CustomerSearchResultScreenContainer;
