import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import SplashScreen from "react-native-smart-splash-screen";

import Login from "./app/components/Login/Login";
import Register from "./app/components/Register/Register";
import CaptureQRCode from "./app/components/TabsNavigator/CaptureQRCode"
import Profile from "./app/components/TabsNavigator/Profile"
import Ranking from "./app/components/TabsNavigator/Ranking"

SplashScreen.close({
  animationType: SplashScreen.animationType.scale,
  duration: 850,
  delay: 500
});

const TabsNavigation = TabNavigator(
  {
    
    Profile: {screen: Profile},
    CaptureQRCode: {screen: CaptureQRCode},
    Ranking: {screen: Ranking},
  },
  {
    initialRouteName: "CaptureQRCode",
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    lazy: true,
    headerMode: 'none',
    tabBarOptions: {
      activeTintColor: 'rgba(44, 62, 80,1.0)',
      inactiveTintColor: 'rgba(52, 73, 94,0.4)'
    }
  }
);

const AppNavigation = StackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    TabsNavigation: {screen: TabsNavigation}
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);


AppRegistry.registerComponent("Joyn", () => AppNavigation);
