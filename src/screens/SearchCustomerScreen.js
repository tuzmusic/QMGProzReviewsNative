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

  automate = {
    mapSearch: () =>
      this.setState(
        { text: "123 Mountain Road, Concord, NH, USA" },
        this.handleSearch.bind(this)
      ),
    executeSearch: () => this.handleSearch(),
    toggleDrawer: () => this.props.navigation.toggleDrawer()
  };

  componentDidMount = () => {
    // if (__DEV__) setTimeout(this.automate.executeSearch.bind(this), 1000);
  };

  state = {
    text: "",
    // text: __DEV__ ? "123 Mountain Road, Concord, NH, USA" : "",
    searchField: "address"
  };

  async handleSearch() {
    if (!this.state.text) return;
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
            value={this.state.text}
            inputStyle={styles.input}
            clearButtonMode={"while-editing"}
            inputContainerStyle={styles.inputContainer}
            onPredictionSelect={text => this.setState({ text })}
          />
          <Button
            title="Search"
            type="outline"
            onPress={this.handleSearch.bind(this)}
          />
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
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 70,
    paddingHorizontal: 10
  },
  input: {
    // I can't figure out how to get rid of the line under the input!
    // So I'm getting rid of the round outline so that the line under looks like it's supposed to be there.
    // borderColor: "grey",
    // borderWidth: borderWidth,
    // borderRadius: borderRadius,
    // marginVertical: 15,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  inputContainer: {
    width: "95%",
    marginVertical: 15,
    marginHorizontal: 15,
    borderWidth: 0
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
