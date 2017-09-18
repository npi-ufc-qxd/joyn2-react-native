import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nomeCompleto: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    };
  }
  
  render() {
    const navigate = this.props.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Cadastrar
        </Text>
        <TextInput
          placeholder="Nome Completo"
          placeholderTextColor="rgba(44, 62, 80,0.7)"
          keyboardType="default"
          returnKeyType="next"
          underlineColorAndroid="rgba(255,255,255,0.0)"
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={()=>this.emailInput.focus()}
          onChangeText={(valorNomeCompleto) => {this.setState({nomeCompleto: valorNomeCompleto})}}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="rgba(44, 62, 80,0.7)"
          keyboardType="email-address"
          returnKeyType="next"
          underlineColorAndroid="rgba(255,255,255,0.0)"
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={()=>this.passwordInput.focus()}
          ref={(input)=> this.emailInput = input}
          onChangeText={(valorEmail) => {this.setState({email: valorEmail})}}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="rgba(44, 62, 80,0.7)"
          returnKeyType="go"
          secureTextEntry
          underlineColorAndroid="rgba(255,255,255,0.0)"
          style={styles.input}
          ref={(input)=> this.passwordInput = input}
          onSubmitEditing={()=>this.confirmPasswordInput.focus()}
          onChangeText={(valorSenha) => {this.setState({senha: valorSenha})}}
        />
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="rgba(44, 62, 80,0.7)"
          returnKeyType="go"
          secureTextEntry
          underlineColorAndroid="rgba(255,255,255,0.0)"
          style={styles.input}
          ref={(input)=> this.confirmPasswordInput = input}
          onChangeText={(valorConfirmarSenha) => {this.setState({confirmarSenha: valorConfirmarSenha})}}
        />
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => this.props.doRegister(navigate, this.state.nomeCompleto, this.state.email, this.state.senha, this.state.confirmarSenha)}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonContainerRegister}
          onPress={() => navigate("Login")}
        >
          <Text style={styles.buttonText}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: 10,
    color: "#2c3e50",
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buttonContainer: {
    backgroundColor: "rgba(44, 62, 80,1.0)",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonContainerRegister: {
    backgroundColor: "rgba(52, 73, 94,1.0)",
    paddingVertical: 15,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: '700'
  },
  title:{
    fontSize:30,
    fontWeight:'100',
    color:'white',
    textShadowColor: '#2c3e50',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 15
  }
});

AppRegistry.registerComponent("RegisterForm", RegisterForm);
