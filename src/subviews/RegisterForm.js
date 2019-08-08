import React, { Component } from "react";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class RegisterForm extends Component {
  state = {
    // username: "testuser1",
    // email: "123123",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
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
        <Button
          title="Register"
          disabled={this.props.isLoading}
          onPress={() => this.props.onSubmit(this.state)}
        />
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

export default connect(({ authReducer: isLoading }) => ({ isLoading }))(
  RegisterForm
);

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
