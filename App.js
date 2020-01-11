import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimenisons, Image, Button, Navigator, TouchableHighlight } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//views
import Login from './src/Componentes/LoginView'
import Principal from './src/Componentes/PrincipalView'
import RegisterUser from './src/Componentes/RegisterUser'
//Scenes
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: '',
      headerStyle: {  backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Home: {
    screen: Principal
  },
  RegisterUser:{
    screen: RegisterUser,
    navigationOptions: {
      title: 'Register',
      headerStyle: {  backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  initialRouteName: 'Login',
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
})




