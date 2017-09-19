import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image, StatusBar, ToastAndroid } from "react-native";
import axios from 'axios';
import RegisterForm from "./RegisterForm";

export default class Register extends Component {

    doRegister(navigate, nomeCompleto, email, senha, confirmarSenha) {
      if (senha === confirmarSenha) {
        axios({
          method: 'post',
          url: 'http://172.18.22.9:8080/cadastrar',
          data: {
            nome: nomeCompleto,
            email: email,
            senha: senha
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          ToastAndroid.showWithGravity('Cadastro realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
          return navigate("Login");
        }).catch(function (error) {
          ToastAndroid.showWithGravity('Algum erro ocorreu, tente novamente!', ToastAndroid.SHORT, ToastAndroid.CENTER);
          console.log(error.message);
        });
      } else {
        ToastAndroid.showWithGravity('Senhas incorretas!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } 
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
              <RegisterForm navigate={navigate} doRegister={this.doRegister}/>
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

AppRegistry.registerComponent("Register", Register);