// @flow
import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { Overlay } from "react-native-elements";
type Props = {
  onDismiss: function
};
type State = {};

export default class PaymentModal extends Component<Props, State> {
  render() {
    return (
      <Overlay overlayStyle={styles.overlay} onBackdropPress={this.props.onDismiss}>
        <View>
          <Text> PaymentModal </Text>
        </View>
      </Overlay>
    );
  }
}

const styles = {
  overlay: {
    height: "85%",
    width: "85%"
  }
};
