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

export default class NewReviewScreen extends Component {
  state = {
    // content: "Here's another review.",
    content: " ",
    rating: 4
  };

  static defaultProps = {
    showButtons: true
  };
  render() {
    const context = this.props.parent || this;
    return (
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating</Text>
          <AirbnbRating
            defaultRating={context.state.rating || context.state.review.rating}
            showRating={false}
            onFinishRating={rating => context.setState({ rating })}
            imageSize={10}
          />
        </View>
        <Input
          ref={ref => (this.textInput = ref)}
          label={"Review"}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          placeholder={"Enter your review"}
          value={context.state.content || context.state.review.content}
          onChangeText={content => context.setState({ content })}
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={100}
          labelStyle={styles.ratingLabel}
        />
        {this.props.showButtons && (
          <View style={styles.buttonsContainer}>
            <Button
              title="Submit"
              onPress={() => context.props.onSubmit(this.state)}
            />
            <Button
              title="Cancel"
              type="outline"
              onPress={context.props.onCancel}
            />
          </View>
        )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%"
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
  }
};
