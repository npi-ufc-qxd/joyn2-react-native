import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './Login/Login';
import Register from './Register/Register';


// export default class App extends Component {
    
    
    
//     // render() {
//     //     return (
//     //         <Register />
//     //     );
//     // }
// }

const App = StackNavigator({
    Login: {screen: Login},
    Register: {screen: Register}
})

AppRegistry.registerComponent("App", () => App);