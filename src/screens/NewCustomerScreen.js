import React, { Component } from "react";
import { connect } from "react-redux";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { ThemeProvider, Text, Divider, Button } from "react-native-elements";
import NewReviewScreen from "./NewReviewScreen";
import { SafeAreaView } from "react-native";
import ControlledInput from "../subviews/ControlledInput";
import { createCustomer } from "../redux/action-creators/customerActionCreators";

class NewCustomerScreen extends Component {
  state = {
    name: "",
    description: "",
    address: "",
    review: {},
    isLoading: false
  };

  componentDidMount = () => {
    if (__DEV__)
      this.setState(
        {
          name: "Mr. Google",
          description: "This dude knows everything!",
          address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
        },
        this.saveCustomer
      );
  };

  static navigationOptions = {
    drawerLabel: "New Customer"
  };

  toggleReviewing() {
    this.setState({ showReview: !this.state.showReview });
  }

  componentDidUpdate(prevProps, prevState) {
    if ((customer = this.props.currentCustomer) && this.state.isLoading) {
      this.setState({ isLoading: false });
      this.props.navigation.navigate("Customer", { customer });
    }
    if (this.props.error && this.state.isLoading) {
      this.setState({ isLoading: false });
    }
    return true;
  }

  async saveCustomer() {
    this.setState({ isLoading: true });
    const { review, isLoading, ...customer } = this.state;
    customer.reviews = this.state.showReview ? [review] : [];
    await this.props.createCustomer(customer);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-start" }}
        enabled
        behavior="position"
      >
        <SafeAreaView style={{ margin: 20 }}>
          <ScrollView>
            <Text h2>New Customer</Text>
            <ControlledInput binder={this} propName={"name"} />
            <ControlledInput binder={this} propName={"address"} />
            <ControlledInput binder={this} propName={"description"} />

            {this.state.showReview && (
              <NewReviewScreen showButtons={false} parent={this} />
            )}

            <View style={styles.buttonsContainer}>
              {/* <Button
                type="outline"
                buttonStyle={[styles.button, styles.leftButton]}
                title={
                  !this.state.showReview ? "Add a review" : "Cancel review"
                }
                onPress={this.toggleReviewing.bind(this)}
              /> */}
              <Button
                buttonStyle={[styles.button, styles.rightButton]}
                title={"Save New Customer"}
                loading={this.state.isLoading}
                // loading={true}
                onPress={this.saveCustomer.bind(this)}
              />
              {this.props.error && (
                <Text style={styles.errorText}>
                  Failed to save. Try again later.
                </Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  ({ customers: { customers, currentCustomer, error }, auth }) => ({
    customers,
    currentCustomer,
    error,
    user: auth.user.user
  }),
  { createCustomer }
)(NewCustomerScreen);

const styles = {
  rootContainer: { margin: 20, paddingBottom: 40 },
  button: {},
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
