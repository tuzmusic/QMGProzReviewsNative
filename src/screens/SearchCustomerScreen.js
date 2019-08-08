import React, { Component } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { Text, Input, Button, Overlay, Image } from "react-native-elements";
import { connect } from "react-redux";
import { searchCustomers } from "../redux/action-creators/customerActionCreators";
import AutoFillMapSearch from "../subviews/AutoFillMapSearch";

const SwipeTip = props => {
  return (
    <View style={styles.tipContainer}>
      <Text style={styles.tip}>swipe from left to create a new customer</Text>
      <Text style={styles.arrow}>⃔</Text>
    </View>
  );
};

export class SearchCustomerScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: "Search"
  });

  automate() {
    this.setState({ text: "123 Main St" });
    this.handleSearch();
    // this.props.navigation.toggleDrawer();
  }

  componentDidMount = () => {
    // setTimeout(this.automate.bind(this), 100);
  };

  state = {
    text: "55-57 59th St",
    text: "123 Main St",
    text: "",
    searchField: "address"
  };

  async handleSearch() {
    await this.props.searchCustomers({
      customers: this.props.customers,
      ...this.state
    });
    const results = this.props.searchResults;
    this.props.navigation.navigate("Results", { results });
  }

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <KeyboardAvoidingView
          style={styles.container}
          enabled
          behavior="height"
        >
          <Image
            source={require("../../assets/images/proz-reviews-logo.png")}
            style={styles.image}
          />
          <Text h4>Search for your Client </Text>
          <Text>What's your client's address?</Text>
          <AutoFillMapSearch
            placeholder="Enter address"
            inputStyle={styles.input}
            clearButtonMode={"while-editing"}
            inputContainerStyle={{ width: full }}
            onPredictionSelect={text => this.setState({ text })}
          />
          {/*  <Input
            inputStyle={styles.input}
            clearButtonMode={"while-editing"}
            placeholder={"Enter address"}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          /> */}
          <Button
            title="Search"
            type="outline"
            onPress={this.handleSearch.bind(this)}
          />
          <Text>{this.state.text}</Text>
        </KeyboardAvoidingView>
        <SwipeTip />
      </View>
    );
  }
}

export default connect(
  ({ customerReducer }) => ({
    customers: customerReducer.customers,
    searchResults: customerReducer.searchResults
  }),
  { searchCustomers }
)(SearchCustomerScreen);

const full = "100%";
const borderWidth = 0.5;
const borderRadius = 30;
const transform = [{ rotateX: "180deg" }];
const styles = {
  image: {
    // borderWidth: 1,
    height: 150,
    width: 200,
    resizeMode: "contain"
  },
  container: {
    width: "100%",
    height: "100%",
    // position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 70,
    paddingHorizontal: 10
  },
  input: {
    borderColor: "grey",
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  inputContainer: {
    borderBottomWidth: 0,
    marginVertical: 15,
    marginHorizontal: 15
  },
  tipContainer: {
    position: "absolute",
    top: "3%",
    width: "35%"
  },
  arrow: {
    fontSize: 50,
    top: -45,
    color: "green",
    transform: [{ rotate: "150deg" }, { rotateY: "180deg" }]
  },
  tip: { left: 20, color: "green" }
};
