// @flow
import React, { Component } from "react";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity } from "react-native";
import PaymentModal from "../subviews/PaymentModal";
import { connect } from "react-redux";
import {startPayment} from "../redux/action-creators/authActionCreators"
import paypalSuccessHtml from "../../__mocks__/apiResponses/PaypalSuccess"
import paypalCancelHtml from "../../__mocks__/apiResponses/PaypalCancel"
import { DEV_MODE } from "../constants/DEV_MODE";

const AUTOMATE = DEV_MODE && true

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
  prePaymentRegistrationHandler: Object => boolean,
  postPaymentRegistrationHandler: function,
  redirectUrl: ?string,
  startPayment: number=>void
};

export class RegisterForm extends Component<Props, State> {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    showModal: false,
  };

  mockState = {
    username: "testuser1",
    email: "api1@prozreviews.com",
    password: "123123",
    passwordConfirmation: "123123"
  }

  button: any // type is bullshit. should be some complicated ref type. but this is just for automating
  
  automate = async () => {
    await this.setState(this.mockState)
    // this.button && this.button.props.onPress()
  }

  componentDidMount = async () => {
    if (AUTOMATE) this.automate()
  };
  
  handlePaymentSuccess = () => {
    console.log("payment successful");
    this.setState({showModal:false})    
    this.props.postPaymentRegistrationHandler(this.state)
  }
  
  handlePaymentCancel = () => {
    console.log("payment cancelled");
    this.setState({showModal:false})    
  }

  render() {
    let source = !this.props.redirectUrl ? null : { uri: this.props.redirectUrl }
    if (DEV_MODE) source = !this.props.redirectUrl ? null : { html: paypalSuccessHtml } 
    if (DEV_MODE) source = !this.props.redirectUrl ? null : { html: paypalCancelHtml } 

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
          title="Register with PayPal ($10/mo)"
          disabled={this.props.isLoading}
          onPress={this.props.prePaymentRegistrationHandler.bind(this, this.state)}
        />

        {this.state.showModal && (
          <PaymentModal 
            testID="payment-modal"
            source={source}
            onPaymentSuccess={this.handlePaymentSuccess.bind(this)}
            onPaymentCancel={this.handlePaymentCancel.bind(this)}
            // onDismiss={() => this.setState({ showModal: false })} 
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
