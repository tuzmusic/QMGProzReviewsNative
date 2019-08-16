// @flow
import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { WebView } from 'react-native-webview';
import { MaterialIndicator } from "react-native-indicators";

type Props = {
  onDismiss: function,
  url: ?string
};
type State = {};

export default class PaymentModal extends Component<Props, State> {
  render() {
    const source = __DEV__ ? require("../../__mocks__/apiResponses/PaypalSuccess.html") : {uri:this.props.url}
    
    return (
      <Overlay isVisible overlayStyle={styles.overlay} 
      // onBackdropPress={this.props.onDismiss}
      >
      
      { 
        // the webview should show its own loader (as well)
        !this.props.url ? 
        <MaterialIndicator testID="spinner"/> : 
        <WebView source={source} 
        testID="payment-webview" />
      } 
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
