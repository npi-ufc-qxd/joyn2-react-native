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

import { STORAGE_KEY, IP } from '../Constants';

import axios from 'axios';

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

  componentWillMount(){
    AsyncStorage.getItem(STORAGE_KEY).then((keyValue) => {
      var instance = axios.create({
          baseURL: IP,
          headers: {'Authorization': keyValue}
      }).get('/usuario/1')
          .then(response => {
              this.setState(
                  {
                      nome: response.data.nome,
                      pontos: response.data.pontos
                  }
              ); 
          })
          .catch(() => {console.log("Erro ao recuperar os dados"); });
    }, (error) => {
      console.log(error.message);
    });
  }
  
  async logout (navigate) {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      ToastAndroid.showWithGravity('Logout realizado com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      navigate('Login');
    } catch (error) {
      console.log(error.message);
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
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10
  }
});

AppRegistry.registerComponent("Profile", Profile);
