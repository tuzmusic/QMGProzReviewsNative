import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, ListItem } from "react-native-elements";
import pluralize from "pluralize";

export class CustomerSearchResultScreen extends Component {
  automate() {
    if (this.props.results.length) {
      const c = this.props.results[0];
      this.props.onCustomerClick(c);
    }
  }

  componentDidMount() {
    // this.automate();
  }

  render() {
    const { results } = this.props;

    return !results.length ? (
      <View style={styles.container}>
        <Text h4>Couldn't find any clients at that address.</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", padding: 15 }}>
          <Text>Found {pluralize("result", results.length, true)}:</Text>
        </View>
        <View style={styles.listContainer}>
          <CustomerList
            customers={results}
            onCustomerClick={this.props.onCustomerClick}
          />
        </View>
      </View>
    );
  }
}

const CustomerList = ({ customers, onCustomerClick }) => {
  return customers.map(c => {
    return (
      <CustomerCell
        customer={c}
        key={c.id}
        onPress={onCustomerClick.bind(this, c)}
      />
    );
  });
};

const CustomerCell = ({ customer, onPress }) => (
  <View style={styles.cellContainer}>
    <TouchableOpacity
      onPress={onPress.bind(this, customer)}
      style={styles.opacity}
    >
      <Text style={styles.result}>{customer.fullName}</Text>
      <Text style={styles.arrow}>></Text>
    </TouchableOpacity>
  </View>
);

export default CustomerSearchResultScreen;

const styles = {
  listContainer: {
    width: "97%",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "grey"
  },
  cellContainer: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "grey"
  },
  opacity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  result: { fontSize: 16, fontWeight: "bold" },
  arrow: {
    color: "grey",
    fontSize: 20
  }
};
