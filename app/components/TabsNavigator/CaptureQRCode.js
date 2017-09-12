import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class CaptureQRCode extends Component {
  static navigationOptions = {
    tabBarLabel: "Capturar QRCode",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="qrcode"
        size={30}
        color={focused ? "rgba(44, 62, 80,1.0)" : "rgba(52, 73, 94,0.4)"}
      />
    )
  };
  state = {
    qrcodeValue: ""
  };

  readQRCode(e) {
    this.setState({ qrcodeValue: e.data });
    ToastAndroid.showWithGravity('QRCode capturado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  sendQRCodeToServer(){
    //REGRA DE NEGOCIO
    ToastAndroid.showWithGravity('Pontos Regastados!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    this.setState({qrcodeValue: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={(e)=>this.readQRCode(e)}
          reactivate
          showMarker
          reactivateTimeout={1000}
          topContent={
            <View style={styles.innerContainer}>
              <Text style={styles.titletext}>
                Aponte para um dos QRCodes espalhados e capture os pontos!
              </Text>
              <Text style={styles.simpleText}>
                  Ao ler o QRCode aparecerá um botão para resgatar os pontos.
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
