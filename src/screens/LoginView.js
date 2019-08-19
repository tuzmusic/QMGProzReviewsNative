// @flow
import React, { Component } from "react";
import { Image, Overlay, Button } from "react-native-elements";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import {
  login,
  register,
  clearError, startPayment
} from "../redux/action-creators/authActionCreators";

import paypalSuccessHtml from "../../__mocks__/apiResponses/PaypalSuccess"
import paypalCancelHtml from "../../__mocks__/apiResponses/PaypalCancel"

import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";
import PaymentModal from "../subviews/PaymentModal";

import { validate } from "email-validator";
import { AsyncStorage, KeyboardAvoidingView } from "react-native";
import * as Types from "../redux/AuthTypes";
import User from "../models/User"
import { DEV_MODE } from "../constants/DEV_MODE";

const AUTOMATE = DEV_MODE && true

type State = { loggingIn: boolean, registering: boolean, errors: string[], paymentInProgress: boolean };
type Props = {  login: Types.LoginApiPostParams => Types.LOGIN_START,  
                register: Types.RegisterApiPostParams => Types.REGISTRATION_START,
                clearError: function, 
                startPayment: number => void,
                isLoading: boolean,
                user: User,
                userReady: boolean,
                error: string,
                navigation: Object,
                redirectUrl: ?string
              };

export class LoginView extends Component<Props, State> {
  state = {
    loggingIn: true,
    registering: false,
    errors: [],
    paymentInProgress: false
  };

  componentDidMount= () => AUTOMATE && this.toggleForm()

  handleLogin({ username, password }: Types.LoginApiPostParams) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!password) errors.push("Password required");

    if (errors.length) {
      this.props.clearError();
      return this.setState({ errors });
    }

    let creds: Types.LoginApiPostParams = { password };
    if (username.includes("@")) {
      creds.email = username;
    } else {
      creds.username = username;
    }

    this.props.login(creds);
  }

  handleRegister({ username, email, password, passwordConfirmation }:Types.RegisterApiPostParams){
    let errors = [];
    if (!username) errors.push("Username required");
    if (!email) errors.push("Email required");
    if (!validate(email)) errors.push("Please enter a valid email address");
    if (!password) errors.push("Password required");
    if (password && !passwordConfirmation)
      errors.push("Please type your password twice");
    if (password && passwordConfirmation && password !== passwordConfirmation)
      errors.push("Passwords don't match");

    this.props.clearError();
    this.setState({ errors });
    if (errors.length) return;

    this.props.register({ username, email, password });
  }

  beginPayment() {
    this.setState({ paymentInProgress: true })
    this.props.startPayment(10)
  }
  
  handlePaymentSuccess = () => {
    console.log("payment successful");
    this.setState({ paymentInProgress: false })    
    // this.props.postPaymentRegistrationHandler(this.state)
  }
  
  handlePaymentCancel = () => {
    console.log("payment cancelled");
    this.setState({ paymentInProgress: false })    
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    if (!nextProps.user) return true;

    if (nextProps.userReady) {
      AsyncStorage.setItem("prozreviews_logged_in_user",JSON.stringify(nextProps.user))
        .then(() => this.props.navigation.navigate("Main"))
        .catch((error) => console.error("Couldn't write user to storage.", error))
      return false;
    } else if (!this.state.paymentInProgress) {
      this.beginPayment()
      return true
    }
    return true
  }

  toggleForm() {
    this.props.clearError();
    this.setState({
      errors: [],
      loggingIn: !this.state.loggingIn,
      registering: !this.state.registering
    });
  }

  render() {
    const Loader = props => {
      const overlayProps = { 
        height: 150,
        width: 150,
        overlayBackgroundColor: "lightblue",
        style: styles.overlay,
        borderRadius: 20
      }
      return <Overlay {...overlayProps} {...props}>
          <MaterialIndicator size={50} style={styles.spinner} color={"green"} />
        </Overlay>
    }

    let source = !this.props.redirectUrl ? null : { uri: this.props.redirectUrl }
    if (DEV_MODE) source = !this.props.redirectUrl ? null : { html: paypalSuccessHtml } 
    if (DEV_MODE) source = !this.props.redirectUrl ? null : { html: paypalCancelHtml } 

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
        <View style={styles.container}>
          <Loader isVisible={this.props.isLoading} />

          {this.state.paymentInProgress && (
            <PaymentModal 
              testID="payment-modal"
              source={source}
              onPaymentSuccess={this.handlePaymentSuccess.bind(this)}
              onPaymentCancel={this.handlePaymentCancel.bind(this)}
            />
          )}
          
          <Image
            source={require("../../assets/images/proz-reviews-logo.png")}
            style={styles.image}
          />
          <React.Fragment key="ERRORS">
            {this.state.errors.map((e, i) => (
              <Text style={styles.errorText} key={i}>{e}</Text>
            ))}
            {!this.state.errors.length && 
              <Text style={styles.errorText}>{this.props.error}</Text>
            }
          </React.Fragment>
          {this.state.loggingIn && 
            <LoginForm
              onSubmit={this.handleLogin.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          }
          {this.state.registering && 
            <RegisterForm
              prePaymentRegistrationHandler={this.handleRegister.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  ({ authReducer }) => ({
    isLoading: authReducer.isLoading,
    user: authReducer.user, 
    userReady: authReducer.userReady,
    error: authReducer.error,
    redirectUrl: authReducer.redirectUrl
  }),
  { login, register, clearError, startPayment }
)(LoginView);

const styles = {
  errorText: {
    color: "red",
    fontSize: 16
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain"
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 40
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5
  }
};
