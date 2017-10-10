import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class LoginForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: ''
    };
  }

  render() {
    const navigate = this.props.navigate;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Seu e-mail"
          placeholderTextColor="rgba(44, 62, 80,0.7)"
          keyboardType="email-address"
          returnKeyType="next"
          underlineColorAndroid="rgba(255,255,255,0.0)"
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={()=>this.passwordInput.focus()}
          onChangeText={(valorEmail) => {this.setState({email: valorEmail})}}
        />
        <TextInput
          placeholder="Sua senha"
          placeholderTextColor="rgba(44, 62, 80,0.7)"
          returnKeyType="go"
          secureTextEntry
          underlineColorAndroid="rgba(255,255,255,0.0)"
          style={styles.input}
          ref={(input)=> this.passwordInput = input}
          onChangeText={(valorSenha) => {this.setState({senha: valorSenha})}}
        />
        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => this.props.doLogin(navigate, this.state.email, this.state.senha)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.buttonContainerRegister}
            onPress={() => navigate('Register')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainerFacebook}
          onPress={() => false}
        >
          <Icon 
            name="facebook"
            size={20} 
            style={styles.iconStyle}
          />
          <Text style={styles.buttonText}>Entrar com Facebook</Text>
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
    borderRadius: 5,
    marginBottom: 10
  },
  buttonContainerFacebook: {
    backgroundColor: "rgba(59,89,152,1.0)",
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: 'center'
  },
  iconStyle: {
    color: "white",
    marginRight: 20
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: '700'
  }
});

AppRegistry.registerComponent("LoginForm", LoginForm);
