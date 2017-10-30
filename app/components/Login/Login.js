import React, { Component } from "react";
import { AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, StatusBar, ToastAndroid } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import LoginForm from "./LoginForm";

import { STORAGE_KEY, IP, PONTOS_KEY, NOME_KEY, ID_EVENTO } from '../Constants';

import FBSDK, {LoginManager,LoginButton,GraphRequest,GraphRequestManager,AccessToken} from 'react-native-fbsdk';

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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
    axios({
      method: 'post',
      url: IP+'/logar',
      data: {
        username: email,
        password: senha
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      }

    }).then(function (response) {

      var accesstoken = JSON.stringify(response.data.token);
      accesstoken = accesstoken.replace(/['"]+/g, '');
      AsyncStorage.setItem(STORAGE_KEY, accesstoken);

      axios({
        method: 'get',
        url: IP+'/usuario/'+ID_EVENTO,
        headers: {
          'Authorization': accesstoken,
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        AsyncStorage.setItem(PONTOS_KEY, JSON.stringify(response.data.pontos));
        AsyncStorage.setItem(NOME_KEY, JSON.stringify(response.data.nome).replace(/['"]+/g, ''));
      }).catch(function (error) {
        console.log('Erro ao recuperar usuario '+error.message);
      });

      ToastAndroid.showWithGravity('Login realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      navigate('TabsNavigation');
    }).catch(function (error) {
      console.log(error);
      ToastAndroid.showWithGravity('Email e/ou Senha incorretos!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    });
  }


  async _fbAuth(navigate){
    LoginManager
    .logInWithReadPermissions(['public_profile,email'])
    .then(function (result) {
      if (result.isCancelled) {
        console.log('Login cancelado pelo usuário');
      } else {
          console.log(result)
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(result);

                  axios({
                    method: 'post',
                    url: IP+'/logarfacebook',
                    data: {
                      keyFacebook: result.id,
                      nome: result.name,
                      email: result.email,
                      foto64: null
                    },
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(function (response){
                    var accesstoken = JSON.stringify(response.data.token);
                    accesstoken = accesstoken.replace(/['"]+/g, '');
                    AsyncStorage.setItem(STORAGE_KEY, accesstoken);

                    axios({
                      method: 'get',
                      url: IP+'/usuario/'+ID_EVENTO,
                      headers: {
                        'Authorization': accesstoken,
                        'Content-Type': 'application/json'
                      }
                    }).then(function (response) {
                      AsyncStorage.setItem(PONTOS_KEY, JSON.stringify(response.data.pontos));
                      AsyncStorage.setItem(NOME_KEY, JSON.stringify(response.data.nome).replace(/['"]+/g, ''));
                    }).catch(function (error) {
                      console.log('Erro ao recuperar usuario '+error.message);
                    });
                    ToastAndroid.showWithGravity('Login realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    navigate('TabsNavigation');
                  }).catch(function (error) {
                    console.log(error);
                    ToastAndroid.showWithGravity('Erro: ' + error.response.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                  });
                }
              }

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()

            }
          )
    } 
  }, function (error) {
    ToastAndroid.showWithGravity('Ocorreu um erro no login, tente novamente!', ToastAndroid.SHORT, ToastAndroid.CENTER);
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
          <LoginForm navigate={navigate} doLogin={this.doLogin} fbAuth={this._fbAuth} />
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
  formContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

AppRegistry.registerComponent("Login", Login);
