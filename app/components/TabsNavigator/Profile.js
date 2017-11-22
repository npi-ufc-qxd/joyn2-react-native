import React, { Component } from "react";
import {
  AppRegistry,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import * as Animatable from "react-native-animatable";

import Icon from "react-native-vector-icons/FontAwesome";

import { STORAGE_KEY, IP, PONTOS_KEY, NOME_KEY, ARRAY_CAPTURADOS } from '../Constants';

import axios from 'axios';
import FBSDK, {LoginManager} from 'react-native-fbsdk';

export default class Profile extends Component {

  static navigationOptions = {
    tabBarLabel: "Meu Perfil",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="user"
        size={30}
        color={focused ? "rgba(44, 62, 80,1.0)" : "rgba(52, 73, 94,0.4)"}
      />
    )
  };
  
  constructor(props){
    super(props);

    this.state = {
      pontos: 0,
      nome: ''
    };
  }

  componentWillUpdate() {
    AsyncStorage.getItem(PONTOS_KEY).then((pontosValue) => {
      this.setState(
        {
            pontos: pontosValue
        }
      );
    }, (error) => {
      console.log('Erro ao recuperar pontos no async '+error.message);
    });
  }

  componentWillMount(){
    AsyncStorage.getItem(PONTOS_KEY).then((pontosValue) => {
      this.setState(
        {
            pontos: pontosValue
        }
      );
    }, (error) => {
      console.log('Erro ao recuperar pontos no async '+error.message);
    });

    AsyncStorage.getItem(NOME_KEY).then((nomeValue) => {
      this.setState(
        {
            nome: nomeValue
        }
      );
    }, (error) => {
      console.log('Erro ao recuperar nome no async '+error.message);
    });
  }
  
  async logout (navigate) {
    try {
      const arrayNaoResgatados = await AsyncStorage.getItem(ARRAY_CAPTURADOS);
      var arrayRecebido = JSON.parse(arrayNaoResgatados);
      if(arrayRecebido.length == 0){
        await AsyncStorage.removeItem(STORAGE_KEY);
        await AsyncStorage.removeItem(PONTOS_KEY);
        await AsyncStorage.removeItem(NOME_KEY);
        await AsyncStorage.removeItem(ARRAY_CAPTURADOS);
        LoginManager.logOut();
        ToastAndroid.showWithGravity('Logout realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        navigate('Login');
      }else{
        ToastAndroid.showWithGravity('Sincronize antes de fazer logout!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async sync () {
    try {
      const arrayNaoResgatados = await AsyncStorage.getItem(ARRAY_CAPTURADOS);
      if (arrayNaoResgatados !== null){
        var arrayRecebido = JSON.parse(arrayNaoResgatados);

        if(arrayRecebido.length === 0){
          ToastAndroid.showWithGravity("Você não tem códigos para sincronizar.", ToastAndroid.SHORT, ToastAndroid.CENTER);
          return;
        }

        var parar = false;
        var indexRemover = new Array();
        console.log("antes: " + arrayRecebido);

        try{
          const keyValue = await AsyncStorage.getItem(STORAGE_KEY);
          if (keyValue !== null){

            for (i = 0; i < arrayRecebido.length; i++) { 
              var codigoAtual = arrayRecebido[i];
                
                await axios({
                  method: 'post',
                  url: IP+'/resgatarqrcode',
                  data: {
                    codigo: codigoAtual
                  },
                  headers: {
                    'Authorization': keyValue,
                    'Content-Type': 'application/json'
                  }
                }).then((response) => {
                  this.setState(
                    {
                        mensagem: response.data.mensagem
                    }
                  );
                  
                  AsyncStorage.setItem(PONTOS_KEY, JSON.stringify(response.data.pontos));
                  ToastAndroid.showWithGravity(this.state.mensagem, ToastAndroid.LONG, ToastAndroid.CENTER);
                  indexRemover.push(i);
                  console.log(i);
                }).catch(function (error) {
                  if(error == 'Error: Network Error'){
                    ToastAndroid.showWithGravity('Sem conexão, conecte-se e tente novamente!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    parar = true;
                  } else if (error.response.status == '409') {
                    indexRemover.push(i);
                    ToastAndroid.showWithGravity('Você capturou um Qr-Code de checkout antes do Qr-Code de checkin!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                  } else {
                    indexRemover.push(i);
                    ToastAndroid.showWithGravity('Você capturou um QR-Code inválido!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                  }
                });
              if(parar == true) break;
            }
            console.log("remover: " + indexRemover);
            for (var j = indexRemover.length -1; j >= 0; j--){
              arrayRecebido.splice(indexRemover[j],1);
              console.log(indexRemover[j]);
            }
            console.log("depois: " + arrayRecebido);
            AsyncStorage.setItem(ARRAY_CAPTURADOS, JSON.stringify(arrayRecebido));
          }
        }  catch (error) {
          console.log(error)
        }      
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={styles.nameTitle}>{this.state.nome}</Text>
        </View>
        
        <Animatable.View animation="zoomInUp" style={styles.points}>
          <Text style={styles.titlepoints}>Sua pontuação</Text>
          <Text style={styles.valuepoints}>
          {this.state.pontos}
          </Text>
        </Animatable.View>

        <TouchableOpacity
          style={styles.buttonSync}
          onPress={() => this.sync(navigate)}
        >
          <Text style={styles.buttonTextSync}>Sincronizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={() => this.logout(navigate)}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "rgba(236, 240, 241,1.0)"
  },
  name: {
    padding:10,
    flex:2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(44, 62, 80,1.0)',
    
  },
  nameTitle:{
    fontSize: 30,
    fontWeight: "100",
    color:'rgba(236, 240, 241,1.0)',
    textAlign: "center",
  },
  points: {
    flex:5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 73, 94,1.0)",
  },
  titlepoints: {
    color:"rgba(236, 240, 241,1.0)"
  },
  valuepoints:{
    fontWeight: "bold",
    textAlign:'center',
    fontSize: 150,
    color:"rgba(236, 240, 241,1.0)"
  },
  buttonLogout: {
    flex:1,
    backgroundColor: "#c0392b",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  buttonTextSync: {
    color: "white",
    fontSize: 20,
    padding: 10
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10
  },
  buttonSync: {
    flex:1,
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  }
});

AppRegistry.registerComponent("Profile", Profile);
