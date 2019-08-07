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
    address: ""
  };

  componentDidMount = () => {
    if (__DEV__)
      this.setState({
        name: "Mr. Google",
        description: "This dude knows everything!",
        address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
      });
  };

  static navigationOptions = {
    drawerLabel: "New Customer"
  };

  toggleReviewing() {
    this.setState({ showReview: !this.state.showReview });
  }

  async saveCustomer() {
    const review = { ...this.state.review, user: this.props.user };
    await this.props.createCustomer({
      ...this.state,
      reviews: this.state.showReview ? [review] : []
    });
    if ((customer = this.props.currentCustomer)) {
      this.props.navigation.navigate("Customer", { customer });
    } else if ((error = this.props.error)) {
      console.log("Error saving new customer.");
    }
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

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                type="outline"
                buttonStyle={styles.button}
                title={
                  !this.state.showReview ? "Add a review" : "Cancel review"
                }
                onPress={this.toggleReviewing.bind(this)}
              />
              <Button
                buttonStyle={styles.button}
                title={"Save New Customer"}
                onPress={this.saveCustomer.bind(this)}
              />
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
  button: {
    marginVertical: 30,
    marginHorizontal: 40,
    borderWidth: 1.5
  },
  divider: {
    margin: 15,
    height: 4,
    borderRadius: 15,
    backgroundColor: "lightblue"
  }
};
