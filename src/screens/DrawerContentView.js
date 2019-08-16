import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Linking } from "react-native";
import { Button, Text, Image } from "react-native-elements";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { logout } from "../redux/action-creators/authActionCreators";
import { AsyncStorage } from "react-native";

class DrawerContentView extends Component {
  componentDidMount() {
    // setTimeout(this.props.logout, 500);
  }

  shouldComponentUpdate(newProps) {
    if (!newProps.user) {
      // just logged out
      this.props.navigation.navigate("Auth");
      return false;
    }
    return true;
  }

  render() {
    const email = "info@prozreviews.com";
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <UserSection props={this.props} />
          <DrawerItems {...this.props} />
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/images/proz-reviews-logo.png")}
              style={styles.image}
            />
            <Text style={styles.text}>For support:</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("mailto:" + email).catch(e => console.log(e))
              }
            >
              <Text style={[styles.text, styles.link]}>{email}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const UserSection = ({ props }) => {
  async function handleLogout() {
    await AsyncStorage.setItem("prozreviews_logged_in_user", "");
    props.logout();
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Logged in as {props.user.username}
      </Text>
      <Button
        title="Log Out"
        buttonStyle={styles.button}
        onPress={handleLogout}
        loading={props.isLoading}
      />
    </View>
  );
};

export default connect(
  ({ authReducer }) => ({
    user: authReducer.user?.user || authReducer.user,
    isLoading: authReducer.isLoading
  }),
  { logout }
)(DrawerContentView);

const styles = {
  container: {
    // alignItems: "center",
    marginVertical: 50
  },
  button: {
    margin: 20,
    backgroundColor: "red"
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain"
  },
  text: { fontSize: 16 },
  link: {
    marginVertical: 2,
    color: "blue",
    textDecorationLine: "underline"
  }
};
