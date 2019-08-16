// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView
} from "react-native";
import {
  ThemeProvider,
  Text,
  Divider,
  Rating,
  Button
} from "react-native-elements";
import Customer from "../models/Customer";
import Review from "../models/Review";
import User from "../models/User";
import ReviewView from "../subviews/ReviewView";
import ReviewsList from "../subviews/ReviewsList";
import NewReviewScreen from "./NewReviewScreen";
import { addNewReview, clearNewItem } from "../redux/action-creators/customerActionCreators";
import * as Types from "../redux/CustomerTypes"
import * as RevTypes from "../redux/ReviewTypes";

type Props = { customer: Customer,
  addNewReview: (RevTypes.ReviewFormObject)=>Object, 
  allCustomers: Types.CustomerCollection, 
  user: User, 
  isLoading: boolean, 
  newReview: Review, 
  clearNewItem: function, 
  error: string
 };
type State = { isReviewing: boolean };

export class CustomerScreen extends Component<Props, State> {

  state = { isReviewing: false };
  
  automate = async () => await setTimeout(this.startReview.bind(this), 10);
  
  componentDidMount = () => {
    // this.automate()
  }
  
  startReview = () => this.setState({ isReviewing: true });
  cancelReview = () => this.setState({ isReviewing: false });
  createReview({content, rating}: Review) {
      if (!content) return
      const review = {
        customerId: this.props.customer.id,
        userId: this.props.user.id,
        content, rating,
      };
      if (__DEV__) {review.userId = 8; review.customerId = 15353}
      this.props.addNewReview(review);
    }
    
  componentDidUpdate = async () => {
    if (this.props.newReview) {
      this.props.clearNewItem()
      this.setState({isReviewing: false})
    }
  };
  
  render() {
    const customer = this.props.allCustomers[this.props.customer.id];
    const listProps = {
      customer,
      onStartReviewPress: this.startReview.bind(this),
    };
    const formProps = {
      onCancel: this.cancelReview.bind(this),
      onSubmit: this.createReview.bind(this),
      isLoading: this.props.isLoading,
      error: this.props.error
    };

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAvoidingView
          style={styles.container}
          enabled
          behavior="position">
          <ScrollView contentContainerStyle={styles.scrollView}>
            <CustomerInfo customer={customer} />
            {this.state.isReviewing
              ? <NewReviewScreen {...formProps} />
              : <Reviews {...listProps} />}
            <Divider style={{ height: 100 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemeProvider>
    );
  }
}
export default connect(
  ({ customerReducer, authReducer }) => ({
    allCustomers: customerReducer.customers, // used to get the latest (local) version of the current customer
    user: authReducer.user?.user || authReducer.user,
    isLoading: customerReducer.isLoading,
    newReview: customerReducer.newItem,
    error: customerReducer.error && "Something went wrong. Try again later.",
  }),
  { addNewReview, clearNewItem }
)(CustomerScreen);

const CustomerInfo = ({ customer }) => {
  return (
    <View>
      <Text h1>{customer.name}</Text>
      <Text style={styles.detailText}>{customer.address}</Text>
      {/* <Text style={styles.customerDescription}>{customer.description}</Text> */}
      {customer.reviews.length > 0 && (
        <View>
          <Text style={styles.detailText}>
            Rating ({customer.reviews.length} reviews):
          </Text>
          <Rating
            readonly
            startingValue={customer.averageRating}
            style={styles.rating}
            imageSize={20}
          />
        </View>
      )}
    </View>
  );
};

const Reviews = props => 
  <View style={{ width: "100%" }}>
    <ReviewsList
      customer={props.customer}
      onStartReviewPress={props.onStartReviewPress}
    />
  </View>

const styles = {
  scrollView: {
    margin: 20,
    marginBottom: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  container:{},
  divider: {
    backgroundColor: "black",
    height: 50
  },
  detailText: { paddingTop: 5 },
  customerDescription: { marginTop: 25, textAlign:"center" },
  rating: { padding: 5, alignItems: "flex-start" }
};

const theme = {
  Text: {
    style: { fontSize: 18 }
  }
};
