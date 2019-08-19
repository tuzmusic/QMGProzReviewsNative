// @flow
import React, { Component } from "react";
import { Image, Overlay, Button } from "react-native-elements";
import { View, Text, TouchableOpacity } from "react-native";
import { DotIndicator, MaterialIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import {
  login,
  register,
  clearError
} from "../redux/action-creators/authActionCreators";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";
import { validate } from "email-validator";
import { AsyncStorage, KeyboardAvoidingView } from "react-native";
import * as Types from "../redux/AuthTypes";
import User from "../models/User"
import { DEV_MODE } from "../constants/DEV_MODE";

const AUTOMATE = DEV_MODE && true

type State = { loggingIn: boolean, registering: boolean, errors: string[] };
type Props = {  login: Types.LoginApiPostParams=>Types.LOGIN_START,  
                register: Types.RegisterApiPostParams=>Types.REGISTRATION_START,
                clearError: function, 
                isLoading: boolean,
                user: User,
                error: string,
                navigation: Object
              };

export class LoginView extends Component<Props, State> {
  state = {
    loggingIn: true,
    registering: false,
    errors: []
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

  handleRegister({ username, email, password, passwordConfirmation }:Types.RegisterApiPostParams): boolean {
    console.log("hello from handleRegister");
    
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


  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (!nextProps.user) return true;
    AsyncStorage.setItem("prozreviews_logged_in_user",JSON.stringify(nextProps.user))
      .then(() => this.props.navigation.navigate("Main"))
      .catch((error) => console.error("Couldn't write user to storage.", error))
    return false;
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
    const overlayProps = { 
      height: 150,
      width: 150,
      overlayBackgroundColor: "lightblue",
      style: styles.overlay,
      borderRadius: 20
    }
  
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
        <View style={styles.container}>
          <Overlay {...overlayProps} isVisible={this.props.isLoading}>
            <MaterialIndicator size={50} style={styles.spinner} color={"green"} />
          </Overlay>
          <Image
            source={require("../../assets/images/proz-reviews-logo.png")}
            style={styles.image}
          />
          {this.state.errors.map((e, i) => (
            <Text style={styles.errorText} key={i}>{e}</Text>
          ))}
          {!this.state.errors.length && 
            <Text style={styles.errorText}>{this.props.error}</Text>
          }
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
    error: authReducer.error
  }),
  { login, register,  clearError }
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
