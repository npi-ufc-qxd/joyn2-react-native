import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Accordion from 'react-native-collapsible/Accordion';

const questions = [
  {
    title: 'O que é o Joyn?',
    content: 'É um aplicativo para celular com o objetivo de "gamificar" os eventos da UFC-Quixadá, '+
    'em especial os Encontros Universitários (EU), premiando os alunos que mais participam. '+
    'O Joyn utiliza a gamificação para incentivar os alunos do campus a participarem de seus eventos.',
  },
  {
    title: 'Como funciona o Joyn?',
    content: 'O Joyn utiliza de forma dinâmica a leitura de QR-Codes para ajuda a controlar a frequência'+ 
    ' no evento. Os alunos também concorrerão a prêmios através da presença nas atividades durante os encontros.',
  },
  {
    title: 'Como faço para participar e receber presença em uma atividade?',
    content:'Para participar de uma atividade é necessário realizar a leitura de QR-Codes da atividade.'+
    ' Existem dois tipos de atividade: CheckIn e CheckIn_CheckOut. Uma atividade do tipo CheckIn é aquela'+
    ' na qual você deverá capturar somente um QR-Code, já numa atividade do tipo CheckIn_CheckOut você deverá'+
    ' capturar dois ou mais QR-Codes (Depende da duração da atividade, por exemplo uma atividade com duração'+
    ' de dois dias terá quatro QR-Codes), um no início e o outro no fim da atividade. Cada atividade'+
    ' possui uma quantidade mínima de frequência que deve ser concluída de acordo com a quantidade de QR-Codes da mesma.'+
    ' Deste modo, se você concluir essa quantidade mínima de frequência especificada você irá receber presença na atividade.',
  },
  {
    title:'Como pontuar no Joyn/nas atividades?',
    content:'Para pontuar em uma atividade é necessário que você obtenha presença na mesma. Deste modo,'+
    ' como explicado no item anterior é necessário capturar uma quantidade mínima de QR-Codes que está'+
    ' diretamente relacionada a frequência da atividade.',
  },
  {
    title:'Como funciona o Ranking?',
    content:'Toda atividade possui uma pontuação, assim o ranking é gerado de acordo com a quantidade de'+
    ' pontos obtidos até o momento por todos os participantes do evento. Logo, quanto mais você participar'+
    ' das atividades e pontuar nas mesmas, melhor será sua pontuação e colocação no ranking.',
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

  _renderHeader(question) {
    return (
      <View style={styles.header2}>
        <Text style={styles.textTitle}>{question.title}</Text>
      </View>
    );
  }
 
  _renderContent(question) {
    return (
      <View style={styles.content}>
        <Text style={styles.textQuestion}>{question.content}</Text>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <ScrollView style={styles.header} >
          <Accordion
            sections={questions}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            underlayColor={'#ecf0f1'}            
          />
        </ScrollView>
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
  textTitle: {
    color: "black",
    height: 70,
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'justify',
    backgroundColor: "white"
  },
  textQuestion: {
    color: "black",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    textAlign: 'justify',
    opacity: 0.8
  },
  header:{
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header2: {
    backgroundColor: '#F5FCFF',
    padding: 5,
  }
});

AppRegistry.registerComponent("Faq", Faq);