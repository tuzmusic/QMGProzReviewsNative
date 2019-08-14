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
  searchAddress: string => Object,
  onPredictionSelect: string => void
};
// #endregion
const automate = {
  async testAddressField() {
    if (this.textInput) { 
      this.textInput.focus()
      this.onChangeText("123")
      setTimeout(() => {
        this.selectPrediction(this.state.addressPredictions[0])
        this.props.onPredictionSelect(this.state.addressPredictions[0].description)
        this.props._submitForm()
      }, 1500);
    }
  },
}
export class AutoFillMapSearch extends Component<Props, State> {
  textInput: ?TextInput;
  state: State = {
    address: "",
    addressPredictions: [],
    showPredictions: false
  };

  async setSamplePrediction() {
    await this.setState({ address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043" });
    this.selectPrediction(this.state.address);
    // this.selectPrediction(this.state.addressPredictions[0]);
    // await this.handleAddressChange();
  }

  async componentDidMount() {
    if (__DEV__) {
      // setTimeout(this.setSamplePrediction.bind(this), 100);
      // this.setState({ address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043" })
      // automate.testAddressField.call(this)
    }
  }

  async handleAddressChange() {
    try {
      const { url, params } = ApiUrls.mapsSearch(this.state.address)
      const res = await axios.get(url, { params })
      // const res = await axios.get(ApiUrls.mapsSearch(this.state.address));
      const { predictions, error_message } = res.data
      if (error_message) throw new Error(error_message);
      this.setState({ addressPredictions: predictions });
    } catch (err) {
      console.warn(err);
    } 
  }

  onChangeText = async (address: string) => {
    // console.log("address:", address);
    this.setState(
      { address, showPredictions: !!address },
      _.debounce(this.handleAddressChange.bind(this), 800)
    );
    // console.log("state", this.state);
    
  };

  async selectPrediction(prediction: Object) {
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
          this.props.onPredictionSelect(prediction.description);
          this.selectPrediction(prediction);
        }}
      >
        <Text style={text.prediction}>{prediction.description}</Text>
      </TouchableOpacity>
    ));
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          ref={ref => (this.textInput = ref)}
          value={this.state.address}
          style={[styles.input, this.props.style]}
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

const text = { prediction: { fontWeight: "100" }};
const styles = {
  input: { fontSize: 16, padding: 5 },
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
