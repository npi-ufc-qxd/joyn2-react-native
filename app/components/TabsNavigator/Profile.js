import React, { Component } from "react";
import {
  AppRegistry,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";

import Icon from "react-native-vector-icons/FontAwesome";

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
  
  state = {
    'pontos': 0
  }

  componentDidMount(){
    AsyncStorage.getItem('pontos')
      .then((value)=>this.setState({'pontos': value}));
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={styles.nameTitle}>Olá, João Alberto Cascais</Text>
        </View>
        
        <Animatable.View animation="zoomInUp" style={styles.points}>
          <Text style={styles.titlepoints}>Sua pontuação</Text>
          <Text style={styles.valuepoints}>
          {this.state.pontos}
          </Text>
        </Animatable.View>

        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={() => alert("Saindo...")}
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
