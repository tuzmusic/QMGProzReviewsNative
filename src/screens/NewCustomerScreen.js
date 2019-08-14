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

const automate = {
  testDescriptionField() {
    this.descriptionField.focus();
  }
};

export class NewCustomerScreen extends Component {
  state = {
    name: "",
    description: "",
    address: "",
    // review: {},
    isLoading: false,
    error: ""
  };
  sampleState = {
    name: "Mr. Google",
    description: "This dude knows everything!"
    // address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
  };
  componentDidMount = () => {
    if (__DEV__) {
      if (this.descriptionField) automate.testDescriptionField.call(this);
      // this.setState(this.sampleState);
    }
  };

  static navigationOptions = {
    drawerLabel: "New Customer"
  };
  saveCustomer() {
    console.log(this.state);
  }
  selectPrediction(address) {
    // console.log(address);
    this.setState({ address });
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        enabled
        behavior="height"
        // keyboardVerticalOffset={40}
      >
        <Text h2>New Customer</Text>
        <Input
          value={this.state.name}
          clearButtonMode={"while-editing"}
          ref={x => (this.nameField = x)}
          onChangeText={name => this.setState({ name })}
          placeholder="Name"
          containerStyle={styles.formItem}
        />
        <AutoFillMapSearch
          placeholder="Address"
          onPredictionSelect={this.selectPrediction.bind(this)}
          _submitForm={this.saveCustomer.bind(this)}
          containerStyle={styles.formItem}
        />
        {/*  <Input
          value={this.state.description}
          ref={x => (this.descriptionField = x)}
          onChangeText={description => this.setState({ description })}
          placeholder="Description"
        /> */}
        <Button
          title="Save Customer"
          onPress={this.saveCustomer.bind(this)}
          containerStyle={[styles.formItem, styles.buttonContainer]}
        />
        <Divider style={{ height: 0 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-start",
    borderWidth: 5,
    padding: 20
  },
  formItem: { marginTop: 25 },
  buttonContainer: {
    marginHorizontal: 40,
    marginVertical: 25
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
