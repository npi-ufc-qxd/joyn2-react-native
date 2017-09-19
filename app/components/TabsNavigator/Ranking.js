import React, { Component } from 'react';
import { AppRegistry,View,Text, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

import axios from 'axios';

import { STORAGE_KEY } from '../Constants';

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
            lista: [],
            seed: 1,
            refreshing: false
        };
    }

    componentWillMount(){
        this.realizarRequest();
    }

    realizarRequest = () => {
        AsyncStorage.getItem(STORAGE_KEY).then((keyValue) => {
            var instance = axios.create({
                baseURL: 'http://172.18.22.9:8080',
                headers: {'Authorization': keyValue}
            }).get('/ranking/1')
                .then(response => {
                    this.setState(
                        {
                            lista: response.data,
                            refreshing: false
                        }
                    ); 
                })
                .catch(() => {console.log("Erro ao recuperar os dados"); });
        }, (error) => {
            console.log(error.message);
        });
    }

    atualizarRanking = () => {
        this.setState({
            seed: this.state.seed + 1,
            refreshing: true
        },
        () => {
            this.realizarRequest();
        }
        );
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
                    onRefresh={this.atualizarRanking}
                    refreshing={this.state.refreshing}
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
        backgroundColor: '#2c3e50',
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