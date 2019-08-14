import React, { Component } from "react";
import { connect } from "react-redux";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import {
  ThemeProvider,
  Text,
  Divider,
  Button,
  Input
} from "react-native-elements";
import NewReviewScreen from "./NewReviewScreen";
import { SafeAreaView } from "react-native";
import ControlledInput from "../subviews/ControlledInput";
import { createCustomer } from "../redux/action-creators/customerActionCreators";
import { AutoFillMapSearch } from "../subviews/AutoFillMapSearch";

export class NewCustomerScreen extends Component {
  state = {
    name: "",
    description: "",
    address: "",
    // review: {},
    isLoading: false
  };
  sampleState = {
    name: "Mr. Google",
    description: "This dude knows everything!"
    // address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
  };
  componentDidMount = () => {
    // if (__DEV__) this.setState(this.sampleState);
  };

  static navigationOptions = {
    drawerLabel: "New Customer"
  };
  saveCustomer() {
    console.log(this.state);
  }
  selectPrediction(address) {
    console.log(address);
    this.setState({ address });
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        enabled
        behavior="height"
      >
        <Text h2>New Customer</Text>
        <Input
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder="Name"
        />
        <AutoFillMapSearch
          placeholder="Address"
          onPredictionSelect={this.selectPrediction.bind(this)}
          _submitForm={this.saveCustomer.bind(this)}
        />
        <Input
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          placeholder="Description"
        />
        <Button title="Save Customer" onPress={this.saveCustomer.bind(this)} />
        <Divider style={{ height: 0 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  keyboardAvoidingView: {
    flex: 1,
    // height: "100%",
    justifyContent: "flex-end",
    // justifyContent: "flex-start",
    borderWidth: 5
  },
  inputContainer: { paddingVertical: 5 },
  leftButton: { width: "100%", marginBottom: 20, borderWidth: 1.5 },
  rightbutton: { width: "100%" },
  buttonsContainer: {
    marginHorizontal: 40,
    marginVertical: 25
  },
  divider: {
    margin: 15,
    height: 4,
    borderRadius: 15,
    backgroundColor: "lightblue"
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 15
  }
};

export default connect(
  ({ customerReducer, authReducer }) => ({
    customers: customerReducer.customers,
    currentCustomer: customerReducer.newItem,
    error: customerReducer.error,
    user: authReducer.user.user
  }),
  { createCustomer }
)(NewCustomerScreen);
