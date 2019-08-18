import React, { Component } from "react";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { DEV_MODE } from "../../App";

const AUTOMATE = DEV_MODE && true;

class LoginForm extends Component {
  state = { username: "", email: "" };

  automate() {
    this.setState({
      username: "testuser2",
      password: "123123"
    });
  }

  componentDidMount() {
    if (AUTOMATE) this.automate();
  }

  render() {
    const regUrl = "https://www.prozreviews.com/subscriber-new/";
    return (
      <ThemeProvider theme={theme}>
        <Input
          placeholder="Username or Email"
          label={this.state.username && "Username or Email"}
          value={this.state.username}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={username => {
            this.props.onChangeText();
            this.setState({ username });
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
        <Button
          title="Login"
          disabled={this.props.isLoading}
          onPress={() => this.props.onSubmit(this.state)}
        />
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={this.props.onLinkClick}>
          <Text style={[styles.text, styles.link]}>
            Click here to register.
          </Text>
        </TouchableOpacity>
      </ThemeProvider>
    );
  }
}

export default connect(({ authReducer }) => ({
  isLoading: authReducer.isLoading
}))(LoginForm);

const theme = {
  Input: {
    containerStyle: {
      padding: 10
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
  text: { fontSize: 20 },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
