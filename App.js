import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

//views
import Login from './src/Componentes/LoginView'
import RegisterUser from './src/Componentes/RegisterUser'

import NewDeuda from './src/Componentes/AddNewDeuda'
import NewPrestamo from './src/Componentes/AddNewPrestamo'

import ListaDeudas from './src/Componentes/ListaDeudas'
import ListaPrestamos from './src/Componentes/ListaPrestamos'


//Scenes
const AppTabNavigator = createBottomTabNavigator({
  ListaPrestamos: {
    screen: ListaPrestamos,
    navigationOptions: {
      tabBarLabel: "Home Page",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="wallet" size={30} color="#900" />
      )
    },
  },

  ListaDeudas: {
    screen: ListaDeudas,
    navigationOptions: {
      tabBarLabel: "Home Page",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="wallet" size={30} color="#900" />
      )
    },
  },
}, {
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes

    [navigation.state.index];
    if (routeName == 'ListaPrestamos') {
      return {
        headerTitle: 'Lista de Prestamos'
      }
    } else {
      if (routeName == 'ListaDeudas') {
        return {
          headerTitle: 'Lista de Deudas'
        }
      }
    }

  }
})
const AppStackNavigator = createStackNavigator({
  AppTabNavigtator: {
    screen: AppTabNavigator,
  }
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {

      headerLeft: () => (
        <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name='menuunfold' color='black' size={25} />


      )
    }
  }
})

class salir extends Component {
  componentDidMount() {
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View>
        <Text>si</Text>
      </View>
    )

  }
}

const AppDraweNavigator = createDrawerNavigator({
  Home: {
    screen: AppStackNavigator,
  },
  NewPrestamo: {
    screen: NewPrestamo
  },
  NewDeuda: {
    screen: NewDeuda
  },
  exit: {
    screen: salir
  }
})



const AppSwitchNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: { headerShown: false }
  },
  Home: {
    screen: AppDraweNavigator,
    navigationOptions: { headerShown: false }

  },
  RegisterUser: {
    screen: RegisterUser,
    navigationOptions: {
      title: 'Sing Up',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  initialRouteName: 'Login',
})


const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  color: {
    backgroundColor: 'blue'
  }
})




