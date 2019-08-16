// @flow
import React, { Component } from "react";
import { Image, Overlay, Button } from "react-native-elements";
import { View, Text, TouchableOpacity } from "react-native";
import { DotIndicator } from "react-native-indicators";
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

type State = { loggingIn: boolean, registering: boolean, errors: string[] };
type Props = {  login: Types.LoginApiPostParams=>Types.LOGIN_START,  
                register: Types.RegisterApiPostParams=>Types.REGISTRATION_START,
                clearError: function, 
                isLoading: boolean,
                user: User,
                error: string,
                navigation: Object
              };

class LoginView extends Component<Props, State> {
  state = {
    loggingIn: true,
    registering: false,
    errors: []
  };

  componentDidMount() {
    const automate = () => {
      setTimeout(() => {
        this.handleLogin({ username: "letmein", password: "123123" });
      }, 500);
    };
    // if (__DEV__) this.toggleForm();
    // automate();
  }

  async handleLogin({ username, password }) {
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

    await this.props.login(creds);
  }

  async handleRegister({ username, email, password, passwordConfirmation }) {
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
    await this.props.register({ username, email, password });
  }

  // async shouldComponentUpdate(nextProps, nextState) {
  //   if (!nextProps.user) return true;
  //   try {
  //     await AsyncStorage.setItem(
  //       "prozreviews_logged_in_user",
  //       JSON.stringify(nextProps.user)
  //     );
  //   } catch (error) {
  //     console.warn("Couldn't write user to storage.", error);
  //   }
  //   this.props.navigation.navigate("Main");
  //   return false;
  // }

   shouldComponentUpdate(nextProps, nextState) {
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
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
        <View style={styles.container}>
          <Overlay
            containerStyle={styles.modal}
            height={200}
            width={200}
            isVisible={this.props.isLoading}
            style={styles.modal}
            borderRadius={20}
            overlayBackgroundColor={"lightblue"}
          >
            <View style={styles.modalContainer}>
              <DotIndicator color={"darkgrey"} />
              <Text>Logging in...</Text>
            </View>
          </Overlay>
          <Image
            source={require("../../assets/images/proz-reviews-logo.png")}
            style={styles.image}
          />
          {this.state.errors.map((e, i) => (
            <Text style={styles.errorText} key={i}>
              {e}
            </Text>
          ))}
          {!this.state.errors.length && (
            <Text style={styles.errorText}>{this.props.error}</Text>
          )}
          {this.state.loggingIn && (
            <LoginForm
              onSubmit={this.handleLogin.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          )}
          {this.state.registering && (
            <RegisterForm
              onSubmit={this.handleRegister.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          )}
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
    // borderWidth: 1,
    height: 250,
    width: 250,
    resizeMode: "contain"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 40
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
