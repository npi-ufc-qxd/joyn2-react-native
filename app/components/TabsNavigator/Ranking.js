import React, { Component } from 'react';
import { AppRegistry,View,Text, StyleSheet, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

import axios from 'axios';

export default class Ranking extends Component {
    static navigationOptions = {
        tabBarLabel: "Ranking",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="trophy"
            size={30}
            color={focused ? "rgba(44, 62, 80,1.0)" : "rgba(52, 73, 94,0.4)"}
          />
        )
    };

    constructor(props){
        super(props);

        this.state = {
            lista: []
        };
    }

    componentWillMount(){

        var instance = axios.create({
            baseURL: 'http://172.18.22.9:8080',
            headers: {'Authorization': 'Joyn eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpYW5rYUBnbWFpbC5jb20iLCJleHAiOjE1MDUzMzM0NDF9.iUM5ADppEKtzVZGgmiLgVNos4IRh72hUpnalMUDPMBDVvcb0sjd5jB9Nszizzx3EmvUSpjOkGaLqcpUSPcNUGg'}
        }).get('/ranking/1')
            .then(response => {this.setState({lista: response.data}); })
            .catch(() => {console.log("Erro ao recuperar os dados"); });


    }

    renderHeader = () => {
        return(
            <View style={styles.headerStyle}>
                <Text style={styles.txtHeader}>Colocação</Text>
                <Text style={styles.txtHeader}>Nome</Text>
                <Text style={styles.txtHeader}>Pontuação</Text>
            </View>
        )
    };
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.lista}
                    renderItem={({item}) => (
                        <View style={styles.viewList}>
                            <Text style={styles.listTxt}>{item.colocacao}º</Text>
                            <Text style={[styles.listTxt, {fontWeight: 'bold'}]}>{item.nome}</Text>
                            <Text style={styles.listTxt}>{item.pontos}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.colocacao}
                    ListHeaderComponent={this.renderHeader}
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
    headerStyle: {
        backgroundColor: '#34495e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    txtHeader: {
        fontSize: 18,
        color: '#fff'
    },
    txtRanking: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    viewList: {
        flex: 1, 
        padding: 20, 
        borderBottomWidth: 1, 
        borderColor: "#CCC", 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listTxt: {
        fontSize: 15
    }
});

AppRegistry.registerComponent("Ranking", Ranking);