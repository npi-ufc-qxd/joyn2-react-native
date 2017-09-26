import React, { Component } from "react";
import { AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, StatusBar, ToastAndroid } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import LoginForm from "./LoginForm";

import { STORAGE_KEY, IP, PONTOS_KEY, NOME_KEY } from '../Constants';

export default class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      visible: false
    };
  }

  componentWillMount(){
    const { navigate } = this.props.navigation;

    AsyncStorage.getItem(STORAGE_KEY).then((keyValue) => {
      this.setState({
        visible: !this.state.visible
      });
      axios({
        method: 'post',
        url: IP+'/testetoken',
        data: {
          token: keyValue
        }
      }).then((response) => {
        this.setState({
          visible: false
        });
        navigate('TabsNavigation');
      }).catch((error) => {
        AsyncStorage.removeItem(STORAGE_KEY);
        AsyncStorage.removeItem(PONTOS_KEY);
        AsyncStorage.removeItem(NOME_KEY);
        this.setState({
          visible: false
        });
        console.log('Token inválido '+error.message);
      });
    }, (error) => {
      console.log('Erro ao recuperar token no async '+error.message);
    });
  }

  async doLogin(navigate, email, senha) {
    axios({
      method: 'post',
      url: IP+'/login',
      data: {
        username: email,
        password: senha
      }
    }).then(function (response) {

      var accesstoken = JSON.stringify(response.data.token);
      accesstoken = accesstoken.replace(/['"]+/g, '');
      AsyncStorage.setItem(STORAGE_KEY, accesstoken);

      axios({
        method: 'get',
        url: IP+'/usuario/1',
        headers: {'Authorization': accesstoken}
      }).then(function (response) {
        AsyncStorage.setItem(PONTOS_KEY, JSON.stringify(response.data.pontos));
        AsyncStorage.setItem(NOME_KEY, JSON.stringify(response.data.nome).replace(/['"]+/g, ''));
      }).catch(function (error) {
        console.log('Erro ao recuperar usuario '+error.message);
      });

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
      <Spinner visible={this.state.visible} textContent={"Validando suas informações..."} textStyle={{color: '#FFF'}} />
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
