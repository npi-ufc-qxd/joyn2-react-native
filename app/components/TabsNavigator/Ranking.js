import React, { Component } from 'react';
import { AppRegistry,View,Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

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
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    RANKING
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(236, 240, 241,1.0)'
    },
});

AppRegistry.registerComponent("Ranking", Ranking);