// @flow
import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { WebView } from 'react-native-webview';

type Props = {
  onDismiss: function
};
type State = {};

export default class PaymentModal extends Component<Props, State> {
  render() {
    return (
      <Overlay overlayStyle={styles.overlay} onBackdropPress={this.props.onDismiss}>
        <WebView source={{uri:"https://google.com"}}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator/>}/>
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
