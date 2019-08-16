// @flow
import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { WebView } from 'react-native-webview';
import { MaterialIndicator } from "react-native-indicators";

type Props = {
  onDismiss?: function,
  source: ?{["html"|"uri"]: string}
};
type State = {};

export default class PaymentModal extends Component<Props, State> {
  render() {
    
    return (
      <Overlay isVisible overlayStyle={styles.overlay} 
      >
      
      { 
        // the webview should show its own loader (as well)
        !this.props.source ? 
          <MaterialIndicator testID="spinner"/> : 
          <WebView source={this.props.source} 
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
