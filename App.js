import React, { Component } from 'react'
import { Root } from "native-base";
import { View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './src/Reducers'
import { MenuProvider } from 'react-native-popup-menu';

//VectorIcons
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'


//components
import Login from './src/Componentes/Login'
import Register from './src/Componentes/Singin'
import NewPrestamo_o_Deuda from './src/Componentes/Prestamo_Deuda_New'
import Componente_Lista from './src/Componentes/Componente_Lista'
import Cartera from './src/Componentes/Cartera'
import MasDetalesItem from './src/Componentes/masDetalesItem'
import Principal from './src/Componentes/Principal'


/*============================================================
this aplication have this navigation structure:
                                 
StackNavigator-> DrawerNaviagtor->StackNavigator->tabNavigator
============================================================*/

/*============================================================ 
coolors color hunt
#3e64ff,#5edfff,#b2fcff,#ecfcff
============================================================*/

/*===========================================================
//Important: in this part only use a View call Lista de Prestamos but with differents params
//TypeList is the name of Table to search in the 2 cases ( DebenList or DebesList)
============================================================*/
/**
 * 
 */
const AppTabNavigator = createBottomTabNavigator({
  ListaPrestamos: {
    screen: (props) => <Componente_Lista {...props} TypeList='DebenList' Txt='Tus Prestamos: ' quien='Le prestaste a' />,
    navigationOptions: {
      headerShown: false,
      tabBarLabel: "lista de Prestamos",
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabstyle}>
          <Foundation name="dollar-bill" size={30} />
          <EvilIcons name="chevron-left" size={25} />
        </View>
      )
    },
  },
  Principal: {
    screen: Principal,
    navigationOptions: {
      headerShown: false,
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name='wallet' size={25} />
      )
    }
  },
  ListaDeudas: {
    screen: (props) => <Componente_Lista {...props} TypeList='DeboList' Txt='Tus Deudas:' quien='Le debes a' />,
    navigationOptions: {
      headerShown: false,
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
  }, initialRouteName: 'Principal'
})
const AppStackNavigator = createStackNavigator({
  AppTabNavigtator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: false
      }
    }
  },
  Detalles: {
    screen: MasDetalesItem,
    navigationOptions: {
      headerShown: false,
      title: '',
      headerStyle: { backgroundColor: '#5173FF' },
      headerTintColor: '#ffffff',
    },
  },

})
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 200, backgroundColor: '#5173FF', alignItems: 'center', justifyContent: 'center' }}>
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
    screen: (props) => <NewPrestamo_o_Deuda {...props} TypeList='DebenList' Txt='¿A quien le prestaste?' scrn='Nuevo Prestamo' Monto='¿Cuento le prestaste?' Concepto=' ¿Para que se los prestaste?' />,
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
    screen: (props) => <NewPrestamo_o_Deuda {...props} TypeList='DeboList' Txt='¿Quien te prestó?' scrn='Nueva Deuda' Monto='¿Cuanto te prestó?' Concepto='¿Para que te los prestó?' />,
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
    screen: Register,
    navigationOptions: {
      title: '',
      headerStyle: { backgroundColor: '#5173FF' },
      headerTintColor: '#ffffff',
      headerShown: false
    }, initialRouteName: Login,
  },

})

const AppContainer = createAppContainer(AppStackNavigator1);

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <MenuProvider>
            <AppContainer manli='soy el mapa'>
            </AppContainer>
          </MenuProvider>
        </Provider>
      </Root>

    )
  }
}
const styles = StyleSheet.create({
  tabstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


