import React,{Component} from 'react'
import {View,Text,StyleSheet,Dimenisons,Image,Button,Navigator,TouchableHighlight} from 'react-native'
import { createStackNavigator } from 'react-navigation';

//views
import Login from './src/Componentes/LoginView'
import Principal  from './src/Componentes/PrincipalView'

//Scenes
const AppNavigator= createStackNavigator ({
  Home:{   
     screen:Principal  
  },
  Login:{
      screen:Login  
  },
})
 
export default class CarteraApp extends Component{
   
  
  render(){
    
    <AppNavigator/>

  }
}

const styles = StyleSheet.create({
  container:{
     flex : 1,
     justifyContent: 'center',
     flexDirection: 'column'
  },

  
})


