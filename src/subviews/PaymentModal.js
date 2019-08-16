// @flow
import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { WebView } from 'react-native-webview';
import { MaterialIndicator } from "react-native-indicators";

type Props = {
  onDismiss?: function,
  source: ?{["html"|"uri"]: string},
  onPaymentSuccess: function,
  onPaymentCancel: function
};
type State = {};

export default class PaymentModal extends Component<Props, State> {
  handleResponse = (data: Object) => {
    if (data.title === "prozreviews-payment-success") 
      this.props.onPaymentSuccess()
     else if (data.title === "prozreviews-payment-cancelled") 
      this.props.onPaymentCancel()
  }

  render() {    
    return (
      <Overlay isVisible overlayStyle={styles.overlay} 
      >    
      { 
        // the webview should show its own loader (as well)
        !this.props.source ? 
          <MaterialIndicator testID="spinner"/> : 
          <WebView source={this.props.source} 
            testID="payment-webview" 
            onNavigationStateChange={data => this.handleResponse(data)}
            />
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
