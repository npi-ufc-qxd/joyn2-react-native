import React, { Component } from "react";
import { AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, StatusBar, ToastAndroid } from "react-native";

import LoginForm from "./LoginForm";

export default class Login extends Component {
  static navigationOptions = {};

  async doLogin(navigate) {
    //REGRA DE NEGOCIO

    try {
      await AsyncStorage.setItem('pontos', '300');
    } catch (error) {
      // Error saving data
    }
    

    ToastAndroid.showWithGravity('Login realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    navigate('TabsNavigation');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <Image
        source={require("../../resources/images/login-bg.jpg")}
        style={styles.backgroundImage}
        blurRadius={1}
        resizeMode='cover'
      >
      <StatusBar
        backgroundColor="rgba(44, 62, 80,1.0)"
        barStyle="light-content"
      />
        <View style={styles.logoContainer}>
          <Image
            source={require("../../resources/images/joyn-logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm navigate={navigate} doLogin={this.doLogin} />
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },

  logoContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    height: 150,
    width: 150
  },
  title: {
    color: "white",
    marginTop: 10,
    opacity: 0.7
  },
  formContainer: {}
});

AppRegistry.registerComponent("Login", Login);
