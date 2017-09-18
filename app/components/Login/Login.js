import React, { Component } from "react";
import { AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, StatusBar, ToastAndroid } from "react-native";
import axios from 'axios';
import LoginForm from "./LoginForm";

var STORAGE_KEY = 'id_token';

export default class Login extends Component {

  async doLogin(navigate, email, senha) {
    axios({
      method: 'post',
      url: 'http://172.18.22.236:8080/login',
      data: {
        username: email,
        password: senha
      }
    }).then(function (response) {

      //Configurar esse retorno, pois às vezes vem em response.data.token 
      //console.log(response.headers.authorization);

      try {
        AsyncStorage.setItem(STORAGE_KEY, response.headers.authorization);
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }

      ToastAndroid.showWithGravity('Login realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      navigate('TabsNavigation');

    }).catch(function (error) {
      ToastAndroid.showWithGravity('Email e/ou Senha incorretos!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    });
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
