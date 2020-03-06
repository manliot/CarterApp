import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native'
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
//views
import Login from './src/Componentes/LoginView'
import RegisterUser from './src/Componentes/RegisterUser'
import NewPrestamo_o_Deuda from './src/Componentes/NewPrestamo_o_Deuda'
import Componente_Lista from './src/Componentes/Componente_Lista'
import Cartera from './src/Componentes/Cartera'

//this aplication have this structure:
//
//                                   
//StackNavigator-> DrawerNaviagtor->StackNavigator->tabNavigator
/* coolors color hunt
3e64ff
5edfff
b2fcff
ecfcff
*/ 
//Scenes

//Important: in this part only use a View call Lista de Prestamos but with differents params
//TypeList is the name of Table to search in the 2 cases ( DebenList or DebesList)
const AppTabNavigator = createBottomTabNavigator({
  ListaPrestamos: {
    screen: (props) => <Componente_Lista {...props} TypeList='DebenList' Txt='Tus Prestamos: ' />,
    navigationOptions: {
      tabBarLabel: "lista de Prestamos",
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabstyle}>
          <Foundation name="dollar-bill" size={30} />
          <EvilIcons name="chevron-left" size={25} />
        </View>
      )
    },
  },
  cartera: {
    screen: Cartera,
    navigationOptions: {
      tabBarLabel: "Cartera",
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name='wallet' size={25} />
      )
    }
  },

  ListaDeudas: {
    screen: (props) => <Componente_Lista {...props} TypeList='DeboList' Txt='Tus Deudas:' />,
    navigationOptions: {
      tabBarLabel: "lista de Deudas",
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabstyle}>
          <Foundation name="dollar-bill" size={30} />
          <EvilIcons name="chevron-right" size={25} />
        </View>
      )
    },
  },
}, {
    navigationOptions: ({ navigation }) => {
    return {
      headerTitle: 'CarterAPP',
      headerStyle: { backgroundColor: '#5173FF' },
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
        <AntDesign name="menuunfold" style={{ paddingLeft: 10, marginLeft: 4 }} onPress={() => navigation.openDrawer()} color='white' size={25} />
      )
    }
  }
})


const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: '#ecfcff', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: 'https://yt3.ggpht.com/a/AGF-l7_G980npHDLK-MsvflU7J8aluAWBb0_S13C8Q=s900-c-k-c0xffffffff-no-rj-mo' }}
        style={{ height: 120, width: 120, borderRadius: 60, }} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const AppDraweNavigator = createDrawerNavigator({
  Home: {
    screen: AppStackNavigator,
    navigationOptions: {
      title: 'Inicio',
      drawerIcon: (tintColor) => (
        <Entypo name='home' size={25} />
      )
    },
  },
  NewPrestamo: {
    screen: (props) => <NewPrestamo_o_Deuda {...props} TypeList='DebenList' Txt='Nombre del Deudor' scrn='Nuevo Prestamos' />,
    navigationOptions: {
      title: 'Nuevo Prestamo',
      headerStyle: { backgroundColor: '#5173FF' },
      headerTintColor: '#ffffff',
      drawerIcon: (tintColor) => (
        <View style={styles.tabstyle}>
          <Foundation name="dollar-bill" size={30} />
        </View>
      )
    },
  },
  NewDeuda: {
    screen: (props) => <NewPrestamo_o_Deuda {...props} TypeList='DeboList' Txt='Nombre del Prestador' scrn='Nueva Deuda' />,
    navigationOptions: {
      title: 'Nueva deuda',
      headerStyle: { backgroundColor: '#5173FF' },
      headerTintColor: '#ffffff',
      drawerIcon: (tintColor) => (
        <View style={styles.tabstyle}>
          <Foundation name="dollar-bill" size={30} />
        </View>
      )
    },
  },
  exit: {
    screen: (props) => props.navigation.navigate('Login'),
    navigationOptions: {
      title: 'Salir',
      drawerIcon: (tintColor) => (
        <Ionicons name='ios-exit' size={25} />
      )
    },
  }
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#5564eb'
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
      headerStyle: { backgroundColor: '#5173FF' },
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

const styles = StyleSheet.create({
  tabstyle: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },


})


