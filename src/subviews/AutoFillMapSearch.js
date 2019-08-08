//  @flow
import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import _ from "lodash";
// import ApiUrls from "../constants/ApiUrls";
import { Platform } from "react-native";
import { ApiUrls } from "../constants/apiConstants";
import axios from "axios"

// #region TYPES
type State = {
  address: string,
  addressPredictions: Object[],
  showPredictions: boolean
};

type Props = {
  style: Object,
  beforeOnPress: function,
  label: string,
  searchAddress: string => Object
};
// #endregion

export class AutoFillMapSearch extends Component<Props, State> {
  textInput: ?TextInput;
  state: State = {
    address: "",
    addressPredictions: [],
    showPredictions: false
  };

  async setSamplePrediction() {
    await this.setState({ address: "88 n spring st 03301" });
    await this.handleAddressChange();
    // this.onPredictionSelect(this.state.addressPredictions[0]);
  }

  async componentDidMount() {
    setTimeout(this.setSamplePrediction.bind(this), 100);
  }

  async handleAddressChange() {
    try {
      const res = await axios.get(ApiUrls.mapsSearch(this.state.address));
      const { predictions, error_message } = res.data
      if (error_message) throw new Error(error_message);
      this.setState({ addressPredictions: predictions });
    } catch (err) {
      console.warn(err);
    } 
  }

  onChangeText = (address: string) => {
    this.setState(
      { address, showPredictions: true },
      _.debounce(this.handleAddressChange.bind(this), 800)
    );
  };

  async onPredictionSelect(prediction: Object) {
    console.log("hello from onPredictionSelect");
    
    this.textInput && this.textInput.blur();
    this.setState({ address: prediction.description, showPredictions: false });
    // propagate the address to the form's address field
  }

  render() {
    const predictions = this.state.addressPredictions.map(prediction => (
      <TouchableOpacity
        style={styles.prediction}
        key={prediction.id}
        onPress={() => {
          console.log("hello from onPress");
          // this.props.beforeOnPress();
          this.onPredictionSelect(prediction);
        }}
      >
        <Text style={text.prediction}>{prediction.description}</Text>
      </TouchableOpacity>
    ));
        // debugger
    return (
      <View>
        <Input
          label={this.props.label}
          ref={ref => (this.textInput = ref)}
          onChangeText={this.onChangeText}
          value={this.state.address}
          style={[styles.input, this.props.style]}
          // containerStyle={styles.input}
          placeholderTextColor={"grey"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          onBlur={() => {
            this.setState({ showPredictions: false });
          }}
          {...this.props}
        />
        {this.state.showPredictions && (
          <View style={styles.predictionsContainer}>{predictions}</View>
        )}
      </View>
    );
  }
}
export default AutoFillMapSearch;

const text = {
  prediction: {
    fontWeight: "100"
  }
};
const styles = {
  input: {
    fontSize: 16, padding: 5
  },
  prediction: {
    padding: 4,
    paddingTop: 10,
    margin: 3,
    borderTopColor: "lightgrey",
    borderTopWidth: 0.5
  },
  predictionsContainer: {
    borderTopWidth: 0,
    margin: 5,
    marginTop: -5,
  }
};
