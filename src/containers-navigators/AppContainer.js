import React, { Component } from "react";
import CustomerScreen from "../screens/CustomerScreen";
import CustomerScreenContainer from "../containers-navigators/CustomerScreenContainer.js";
import CustomerSearchResultScreenContainer from "../containers-navigators/CustomerSearchResultScreenContainer.js";
import CustomerSearchResultScreen from "../screens/CustomerSearchResultScreen";
import SearchCustomerScreen from "../screens/SearchCustomerScreen";
import NewCustomerScreen from "../screens/NewCustomerScreen";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import AuthStack from "../containers-navigators/AuthNavigator";
import DrawerContentView from "../screens/DrawerContentView";

const NewCustomerStack = createStackNavigator(
  {
    NewCustomer: {
      screen: NewCustomerScreen,
      navigationOptions: { title: "New Customer" }
    },
    Customer: {
      screen: CustomerScreenContainer,
      navigationOptions: { title: "Customer" }
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchCustomerScreen,
      navigationOptions: {
        title: "Search"
      }
    },
    Results: {
      screen: CustomerSearchResultScreenContainer,
      navigationOptions: {
        title: "Search Results"
      }
    },
    Customer: {
      screen: CustomerScreenContainer,
      navigationOptions: {
        title: "Customer"
      }
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Search: {
      screen: SearchStack,
      navigationOptions: {
        drawerLabel: "Find a Customer"
      }
    },
    NewCustomer: {
      screen: NewCustomerStack,
      navigationOptions: {
        drawerLabel: "Add a New Customer"
      }
    }
  },
  {
    contentComponent: DrawerContentView
    // initialRouteName: "NewCustomer"
  }
);

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthStack,
  Main: DrawerNavigator
});

const AppNavigator = SwitchNavigator;

export default AppContainer = createAppContainer(AppNavigator);
