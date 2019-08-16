// @flow
import React, { Component } from "react";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity } from "react-native";
import PaymentModal from "../subviews/PaymentModal";
import { connect } from "react-redux";
import {startPayment} from "../redux/action-creators/authActionCreators"
import htmlMock from "../../__mocks__/apiResponses/PaypalSuccess"

type State = {
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  showModal: boolean,
};

type Props = {
  isLoading: boolean,
  onChangeText: function, // resets errors in LoginView
  onLinkClick: function,
  redirectUrl: ?string,
  startPayment: number=>void
};

export class RegisterForm extends Component<Props, State> {
  state = {
    // username: "testuser1",
    // email: "123123",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    showModal: false,
  };

  button: any // bullshit. just for automating
  
  automate = async () => {
    // await this.setState({showModal:true})
    this.button && this.button.props.onPress()
  }

  componentDidMount = () => {
    this.automate()
  };
  
  render() {
    const source = !this.props.redirectUrl 
      ? null 
      : __DEV__ 
        ? { html: htmlMock } 
        : { uri: this.props.redirectUrl }

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment key="INPUT FIELDS">
          <Input
            placeholder="Username"
            label={this.state.username && "Username"}
            value={this.state.username}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={username => {
              this.props.onChangeText();
              this.setState({ username });
            }}
          />
          <Input
            placeholder="Email"
            label={this.state.email && "Email"}
            value={this.state.email}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={email => {
              this.props.onChangeText();
              this.setState({ email });
            }}
          />
          <Input
            placeholder="Password"
            label={this.state.password && "Password"}
            secureTextEntry
            value={this.state.password}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={password => {
              this.props.onChangeText();
              this.setState({ password });
            }}
          />
          <Input
            placeholder="Retype password"
            label={this.state.passwordConfirmation && "Retype password"}
            secureTextEntry
            value={this.state.passwordConfirmation}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={passwordConfirmation => {
              this.props.onChangeText();
              this.setState({ passwordConfirmation });
            }}
          />
        </ React.Fragment >

        <Button
          ref={(x) => this.button=x}
          title="Register"
          disabled={this.props.isLoading}
          // onPress={() => this.props.onSubmit(this.state)}
          onPress={async () => {
            await this.setState({ showModal: true })
            this.props.startPayment(10)
          }}
        />

        {this.state.showModal && (
          <PaymentModal 
          source={source}
          // url={source}
          onDismiss={() => this.setState({ showModal: false })} 
          />
        )}

        <TouchableOpacity onPress={this.props.onLinkClick}>
          <Text style={{ fontSize: 16 }}>
            Already have an account? <Text style={styles.link}>Click here</Text>{" "}
            to log in.
          </Text>
        </TouchableOpacity>
      </ThemeProvider>
    );
  }
}

export default connect(({ authReducer }) => ({
  isLoading: authReducer.isLoading, 
  redirectUrl: authReducer.redirectUrl
}), {startPayment})(RegisterForm);

const theme = {
  Input: {
    containerStyle: {
      padding: 5
    }
  },
  Button: {
    containerStyle: {
      padding: 30,
      width: "100%"
    }
  },
  Text: {
    style: {
      fontSize: 16
    }
  }
};

const styles = {
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
