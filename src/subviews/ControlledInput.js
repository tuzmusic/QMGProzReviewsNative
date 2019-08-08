import React, { Component } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import Sugar from "sugar";
Sugar.extend();

export default ControlledInput = ({ binder, ...props }) => {
  return (
    <View style={[props.containerStyle]}>
      <Input
        style={[props.inputStyle]}
        placeholder={props.placeholder || props.propName.titleize()}
        label={
          binder.state[props.propName] &&
          (props.placeholder || props.propName.titleize())
        }
        value={binder.state[props.propName]}
        errorMessage={props.errorMessage}
        onBlur={props.onBlur}
        onChangeText={
          props.onChangeText ||
          (value => binder.setState({ [props.propName]: value }))
        }
        keyboardType={props.keyboardType}
        textAlign={props.textAlign}
        multiline={props.multiline}
        numberOfLines={5} // android only, eh?
      />
    </View>
  );
};

const styles = {
  inputContainer: {
    padding: 5
  }
};
