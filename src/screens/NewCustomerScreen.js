// @flow
import * as React from "react";
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
import Customer from "../models/Customer";
import User from "../models/User";
import * as Types from "../redux/CustomerTypes";
import { clearError } from "../redux/actions/authActions";
type Props = {
  currentCustomer: Customer,
  error: string,
  user: User,
  createCustomer: Types.CustomerApiPostPayload => void,
  clearError: function
};
type State = {
  name: string,
  address: string,
  isLoading: boolean,
  errors: string[],
  description?: string,
  review?: Object
};
export class NewCustomerScreen extends React.Component<Props, State> {
  descriptionField: React.ElementRef<Input>;
  nameField: React.ElementRef<Input>;

  automate = {
    testDescriptionField() {
      this.descriptionField.focus();
    }
  };

  state = {
    name: "",
    address: "",
    isLoading: false,
    errors: []
    // description: "",
    // review: {},
  };
  sampleState = {
    name: "Mr. Google",
    description: "This dude knows everything!"
    // address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
  };
  componentDidMount = () => {
    if (__DEV__) {
      if (this.descriptionField) this.automate.testDescriptionField.call(this);
      // this.setState(this.sampleState);
    }
  };

  static navigationOptions = {
    drawerLabel: "New Customer"
  };

  async fieldsValid(): Promise<boolean> {
    let isValid = true;
    if (!this.state.name) {
      isValid = false;
      await this.setState({
        errors: this.state.errors.concat("Please enter a name.")
      });
    }
    if (!this.state.address) {
      isValid = false;
      await this.setState({
        errors: this.state.errors.concat("Please select an address.")
      });
    }
    return isValid;
  }
  async saveCustomer() {
    console.log(this.state);
    if (!(await this.fieldsValid())) return;
    await this.props.createCustomer(this.state);
  }

  selectPrediction = (address: string) => this.setState({ address });
  clearAllErrors = () => {
    this.props.clearError();
    this.setState({ errors: [] });
  };
  render() {
    const inputProps = {
      onFocus: this.clearAllErrors.bind(this)
    };
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        enabled
        behavior="height"
        // keyboardVerticalOffset={40}
      >
        <Text h2>New Customer</Text>
        <Input
          {...inputProps}
          value={this.state.name}
          clearButtonMode={"while-editing"}
          ref={x => (this.nameField = x)}
          onChangeText={name => this.setState({ name })}
          placeholder="Name"
          containerStyle={styles.formItem}
        />
        <AutoFillMapSearch
          {...inputProps}
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
        <Text style={styles.errorText}>
          {this.state.errors.concat(this.props.error).join("\n")}
        </Text>
        <Divider style={{ height: 0 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-start",
    // borderWidth: 5,
    padding: 20
  },
  formItem: { marginTop: 25 },
  buttonContainer: {
    marginHorizontal: 40,
    marginTop: 25
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
    currentCustomer: customerReducer.newItem,
    error: customerReducer.error && "Something went wrong. Try again later.",
    user: authReducer.user.user
  }),
  { createCustomer, clearError }
)(NewCustomerScreen);
