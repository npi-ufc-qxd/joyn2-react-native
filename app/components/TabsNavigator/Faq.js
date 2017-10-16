import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ToastAndroid,
    StatusBar
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Accordion from 'react-native-collapsible/Accordion';

const perguntas = [
  {
    title: 'O que é o Joyn?',
    content: 'É um aplicativo para dispositivos móveis com o objetivo de "gamificar" os eventos da UFC-Quixadá, '+
    ' em especial os encontros universitários (EU), premiando os alunos que mais participassem. '+
    ' O JOYN utiliza-se da gamificação para incentivar os alunos do campus a participarem de seus eventos.',
  },
  {
    title: 'Como funciona o Joyn?',
    content: 'O Joyn utiliza-se de forma dinâmica da leitura de QR-Codes para ajuda a controlar a frequência'+ 
    ' no evento e os alunos ainda concorrerão a prêmios através da presença nas atividades durante os encontros.',
  },
  {
    title: 'Como faço para participar e receber presença em uma atividade?',
    content:'Para participar de uma atividade é necessário realizar a leitura de QR-Codes da atividade.'+
    ' Existem dois tipos de atividade: CheckIn e CheckIn_CheckOut. Uma atividade do tipo CheckIn é aquela'+
    ' na qual você deverá capturar somente um QR-Code, já uma atividade do tipo CheckIn_CheckOut você deverá'+
    ' capturar dois ou mais QR-Codes (Depende da duração da atividade, por exemplo uma atividade com duração'+
    ' de dois dias terá quatro QR-Codes), um no início e o outro no fim da atividade, esse tipo de atividade'+
    ' possue uma quantidade mínima de frequência que deve ser concluída de acordo com a quantidade de QR-Codes da mesma.'+
    ' Deste modo, se você concluir essa quantidade mínima de frequência especificada você irá receber presença nessa atividade.',
  },
  {
    title:'Como pontuar no Joyn/nas atividades?',
    content:'Para pontuar em uma atividade é necessário que você obtenha presença na mesma. Deste modo,'+
    ' como explicado no item anterior(3) é necessário capturar uma quantidade mínima de QR-Codes que está'+
    ' diretamente relacionada a frequência da atividade.',
  },
  {
    title:'Como funciona o Ranking?',
    content:'Toda atividade possui uma pontuação, assim o ranking é gerado de acordo com a quantidade de'+
    ' pontos obtidos até o momento por todos os participantes do evento. Logo, quanto mais você participar'+
    ' das atividades e pontuar nas mesmas, melhor será sua pontuação no ranking.',
  }
];

export default class Faq extends Component {
  static navigationOptions = {
    tabBarLabel: "FAQ",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="question"
        size={30}
        color={focused ? "rgba(44, 62, 80,1.0)" : "rgba(52, 73, 94,0.4)"}
      />
    )
  };

  constructor(props) {
    super();

    this.state = {
      
    };
  }

  _renderHeader(pergunta) {
    return (
      <View style={styles.header}>
        <Text style={styles.textoTitulo}>{pergunta.title}</Text>
      </View>
    );
  }
 
  _renderContent(pergunta) {
    return (
      <View style={styles.header}>
        <Text style={styles.textoPergunta}>{pergunta.content}</Text>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        // <Image
        //   source={require("../../resources/images/login-bg.jpg")}
        //   style={styles.backgroundImage}
        //   blurRadius={1}
        //   resizeMode='cover'
        // >
        // <StatusBar
        //   backgroundColor="rgba(44, 62, 80,1.0)"
        //   barStyle="light-content"
        // />
        // </Image>
        <Accordion
          sections={perguntas}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
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
  textoTitulo: {
    color: "black",
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  textoPergunta: {
    color: "black",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    opacity: 0.7
  },
  header:{
    marginTop: 10
  },
  formContainer: {}
});

AppRegistry.registerComponent("Faq", Faq);