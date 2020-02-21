import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

//views
import Login from './src/Componentes/LoginView'
import RegisterUser from './src/Componentes/RegisterUser'


import NewPrestamo_o_Deuda from './src/Componentes/NewPrestamo_o_Deuda'


import Componente_Lista from './src/Componentes/Componente_Lista'

//this aplication have this structure:
//
//                                   
//StackNavigator-> DrawerNaviagtor->StackNavigator->tabNavigator

//Scenes

//Important: in this part only use a View call Lista de Prestamos but with differents params
//TypeList is the name of Table to search in the 2 cases ( DebenList or DebesList)
const AppTabNavigator = createBottomTabNavigator({
  ListaPrestamos: {
    screen: (props) => <Componente_Lista {...props} TypeList='DebenList' Txt='Los que te deben' />,
    navigationOptions: {
      tabBarLabel: "Home Page",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="wallet" size={30} color="#900" />
      )
    },
  },

  ListaDeudas: {
    screen: (props) => <Componente_Lista {...props} TypeList='DeboList' Txt='A los que les debes' />,
    navigationOptions: {
      tabBarLabel: "Home Page",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="wallet" size={30} color="#900" />
      )
    },
  },
}, {
  navigationOptions: ({ navigation }) => {
    /*const { routeName } = navigation.state.routes
    [navigation.state.index];
    if (routeName == 'ListaPrestamos') {
      return {
        headerTitle: 'Lista de Prestamos',
        headerStyle: { backgroundColor: '#5564eb' },
        headerTintColor: '#ffffff',
      }
    } else {
      if (routeName == 'ListaDeudas') {
        return {
          headerTitle: 'Lista de Deudas',
          headerStyle: { backgroundColor: '#5564eb' },
          headerTintColor: '#ffffff',
        }
      }
    }*/
    return {
      headerTitle: 'CarterAPP',
      headerStyle: { backgroundColor: '#5564eb' },
      headerTintColor: '#ffffff',
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
    screen: (props) => <NewPrestamo_o_Deuda {...props} TypeList='DebenList' Txt='Nombre del Deudor' scrn='Nuevo Prestamos' />,
    navigationOptions: {
      title: 'Nuevo Prestamo',
      headerStyle: { backgroundColor: '#5564eb' },
      headerTintColor: '#ffffff',
    },
  },
  NewDeuda: {
    screen: (props) => <NewPrestamo_o_Deuda {...props} TypeList='DeboList' Txt='Nombre del Prestador' scrn='Nueva Deuda' />,
    navigationOptions: {
      title: 'Nueva deuda',
      headerStyle: { backgroundColor: '#5564eb' },
      headerTintColor: '#ffffff',
    },
  },
  exit: {
    screen: salir
  }
})



const AppStackNavigator1 = createStackNavigator({
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
      title: '',
      headerStyle: { backgroundColor: '#5564eb' },
      headerTintColor: '#ffffff',
    },
  },
  initialRouteName: 'Login',
})


const AppContainer = createAppContainer(AppStackNavigator1);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}


