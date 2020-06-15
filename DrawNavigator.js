import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'

//for menu (DrawNavigator)
import NewDeuda from './src/Componentes/AddNewDeuda'
import NewPrestamo from './src/Componentes/AddNewPrestamo'
const CustomDraweCOMPONENT = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
            <DrawerItems{...props} />
        </ScrollView>
    </SafeAreaView>
)
const AppDraweNavigator = createDrawerNavigator({
    NewPrestamo: {
        screen: NewPrestamo
    },
    NewDeuda: {
        screen: NewDeuda
    }

})
class DreawNav extends Component {
    render() {
        return (
            <AppDraweNavigator />

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },

})

module.exports = DreawNav;