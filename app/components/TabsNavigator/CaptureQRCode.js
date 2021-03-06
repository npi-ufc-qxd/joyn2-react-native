import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import QRCodeScanner from "react-native-qrcode-scanner";
import axios from 'axios';

import { STORAGE_KEY, IP, PONTOS_KEY, ARRAY_CAPTURADOS } from '../Constants';

export default class CaptureQRCode extends Component {
  static navigationOptions = {
    tabBarLabel: "Capturar QR-Code",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="qrcode"
        size={30}
        color={focused ? "rgba(44, 62, 80,1.0)" : "rgba(52, 73, 94,0.4)"}
      />
    )
  };

  constructor(props){
    super(props);

    this.state = {
        qrcodeValue: '',
        mensagem: ''
    };
  }

  readQRCode(e) {
    this.setState({ qrcodeValue: e.data });
    ToastAndroid.showWithGravity('QR-Code capturado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  async sendQRCodeToServer(){
    var qrCode = this.state.qrcodeValue;
    AsyncStorage.getItem(STORAGE_KEY).then((keyValue) => {
      
      axios({
        method: 'post',
        url: IP+'/resgatarqrcode',
        data: {
          codigo: this.state.qrcodeValue
        },
        headers :{
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
        this.setState({qrcodeValue: ''})
      }).catch(function (error) {
        if(error == 'Error: Network Error'){
          AsyncStorage.getItem(ARRAY_CAPTURADOS).then((arrayNaoResgatados) => {
            var arrayRecebido = JSON.parse(arrayNaoResgatados);
            if(arrayRecebido.indexOf(qrCode) == -1){
              arrayRecebido.push(qrCode);
              AsyncStorage.setItem(ARRAY_CAPTURADOS, JSON.stringify(arrayRecebido));
            }
            ToastAndroid.showWithGravity('Sem conexão. Sincronize quando tiver conexão!', ToastAndroid.SHORT, ToastAndroid.CENTER);
          }).catch(function (error) {
            console.log(error);
            ToastAndroid.showWithGravity('Erro ao recuperar QR-Code!', ToastAndroid.SHORT, ToastAndroid.CENTER);
          });
        } else if (error.response.status == '409') {
          ToastAndroid.showWithGravity('Capture o QR-Code de Checkin primeiro ou sincronize e tente novamente!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
          ToastAndroid.showWithGravity('QR-Code inválido!', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
      });
    }, (error) => {
      console.log(error.message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => this.readQRCode(e)}
          reactivate
          showMarker
          reactivateTimeout={3500}
          topContent={
            <View style={styles.innerContainer}>
              <Text style={styles.titletext}>
                Aponte para um dos QR-Codes espalhados e capture os pontos!
              </Text>
              <Text style={styles.simpleText}>
                Ao ler o QR-Code aparecerá um botão para resgatar os pontos.
              </Text>
            </View>
          }
          bottomContent={
            (this.state.qrcodeValue!='') ?
                <View style={styles.innerContainer}>
                <TouchableOpacity
                  style={styles.buttonContainerRegister}
                  onPress={() => this.sendQRCodeToServer()}
                >
                <Text style={styles.buttonText}>Resgatar Pontos</Text>
                </TouchableOpacity>
                </View>
                :
                ''
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(236, 240, 241,1.0)'
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  titletext: {
    fontSize: 20,
    fontWeight: "100",
    textAlign: "center"
  },
  simpleText:{
      textAlign:'center'
  },
  buttonContainerRegister: {
    backgroundColor: "rgba(52, 73, 94,1.0)",
    padding: 15,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700"
  }
});

AppRegistry.registerComponent("CaptureQRCode", CaptureQRCode);
