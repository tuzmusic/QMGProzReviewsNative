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
    this.automate();
  }

  render() {
    const results = this.props.results;

    return !results.length ? (
      <EmptyResults />
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
      <Text style={styles.result}>{customer.name}</Text>
      <Text style={styles.arrow}>></Text>
    </TouchableOpacity>
  </View>
);

const EmptyResults = props => {
  const masterStyle = { paddingVertical: 10, fontSize: 20 };
  Txt = ({ style, ...props }) => (
    <Text style={[style, masterStyle]} {...props}>
      {props.children}
    </Text>
  );
  return (
    <View style={styles.emptyResultsContainer}>
      <Txt h4 style={{ textAlign: "center" }}>
        Sorry, we couldn't find any customers at that address.
      </Txt>
      <Txt>
        If you expected different results, try selecting a different version of
        the address.
      </Txt>
      <Txt>For instance, Google's Headquarters, at</Txt>

      <Txt style={{ fontWeight: "bold", textAlign: "center" }}>
        1600 Amphitheatre Parkway, Mountain View, CA, USA
      </Txt>
      <Txt>is also listed in the search as</Txt>
      <Txt style={{ fontWeight: "bold", textAlign: "center" }}>
        1600 Amphitheatre Pkwy, Mountain View, CA, USA.
      </Txt>

      <Txt>
        If the customer's address was stored as "1600 Amphitheatre Pkwy",
        selecting "1600 Amphitheatre Parkway" will not find the customer.
      </Txt>
    </View>
  );
};

export default CustomerSearchResultScreen;

const styles = {
  emptyResultsContainer: {
    margin: 20
  },
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
