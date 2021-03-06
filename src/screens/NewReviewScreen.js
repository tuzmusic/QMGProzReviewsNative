import React, { Component } from "react";
import {
  Text,
  Input,
  Button,
  AirbnbRating,
  Divider
} from "react-native-elements";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { DEV_MODE } from "../constants/DEV_MODE";
const AUTOMATE = DEV_MODE && true;

export default class NewReviewScreen extends Component {
  state = {
    review: {
      content: "",
      content: AUTOMATE ? "review posted at 1565652383" : "",
      rating: 4
    }
  };

  static defaultProps = {
    showButtons: true
  };
  render() {
    // if (this.state.content === "") debugger;
    const context = this.props.parent || this;
    return (
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating</Text>
          <AirbnbRating
            defaultRating={context.state.review.rating}
            showRating={false}
            onFinishRating={rating =>
              context.setState({ review: { ...this.state.review, rating } })
            }
            imageSize={10}
          />
        </View>
        <Input
          ref={ref => (this.textInput = ref)}
          label={"Review"}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          placeholder={"Enter your review"}
          value={context.state.review.content}
          onChangeText={content =>
            context.setState({ review: { ...this.state.review, content } })
          }
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={100}
          labelStyle={styles.ratingLabel}
        />
        {this.props.showButtons && (
          <View style={styles.buttonsContainer}>
            <Button
              title="Submit"
              onPress={() => context.props.onSubmit(this.state.review)}
              style={{ marginBottom: 10 }}
              loading={this.props.isLoading}
            />
            <Button
              title="Cancel"
              type="outline"
              onPress={context.props.onCancel}
            />
          </View>
        )}
        <Text style={styles.errorText}>{this.props.error}</Text>
      </View>
    );
  }
}

const border = { borderColor: "blue", borderWidth: 0.5 };

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: 30
  },
  buttonsContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: "70%"
  },
  input: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 200
  },
  inputContainer: {
    borderBottomWidth: 0,
    marginVertical: 15,
    marginHorizontal: 5
  },
  ratingContainer: { width: "100%", paddingHorizontal: 10, marginBottom: 15 },
  ratingLabel: {
    textAlign: "left",
    alignItems: "flex-start",
    color: "grey",
    fontWeight: "bold",
    fontSize: 16
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 15
  }
};
