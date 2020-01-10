import React,{Component} from 'react'
import {View,Text,StyleSheet,Dimenisons,Image,Button,Navigator,TouchableHighlight} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//views
import Login from './src/Componentes/LoginView'
import Principal  from './src/Componentes/PrincipalView'

//Scenes
const AppNavigator= createStackNavigator ({
  Login:{
    screen:Login  
  },
  Home:{   
     screen:Principal  
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
  container:{
     flex : 1,
     justifyContent: 'center',
     flexDirection: 'column'
  }, 
})




