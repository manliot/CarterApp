import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'

import dimConverter from '../dimxPixels'

import styleLogin from '../Styles/LoginStyles'

const user = 'Manlio'
export default class NewPricipal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={{ height: dimConverter(88), width: dimConverter(88), position: 'absolute', top: dimConverter(7), right: dimConverter(20) }} source={require('../../assets/images/user.png')}></Image>
                    <Text style={styles.text_saludo}>¡Hola {user}!</Text>
                    <Text style={styles.text_resumen}>Este es tu resumen actual...</Text>
                </View>
                <View style={styles.body}>
                    <View style={[styles.box, { marginTop: -dimConverter(138), height: '70%', borderRadius: dimConverter(32), width: dimConverter(529), paddingStart: dimConverter(55), paddingTop: dimConverter(46) }]}>
                        <Text style={[styles.nombre_box]}>Principal</Text>
                        <Text style={[styles.tex_deben_debes, { marginTop: 0 }]}>Te deben</Text>
                        <Text style={[styles.text_valor]}>$400.000</Text>
                        <Text style={[styles.text_ver_detalles]}>VER DETALLES</Text>
                        <Text style={[styles.tex_deben_debes]}>Debes</Text>
                        <Text style={[styles.text_valor]}>$400.000</Text>
                        <Text style={[styles.text_ver_detalles]}>VER DETALLES</Text>
                    </View>
                    <View style={{ elevation: 10, }}>
                        <Image style={{ height: dimConverter(132), width: dimConverter(132), marginTop: dimConverter(-65), position: 'absolute', left: dimConverter(195) }} source={require('../../assets/images/plus.png')}></Image>
                    </View>
                </View>

            </View>

        )
    }
}
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'blue'
    },
    header: {
        height: dimConverter(385),
        backgroundColor: '#65d359',
        color: 'white',
        alignItems: 'center'
    },
    nombre_box: {
        textAlign: 'right',
        marginRight: dimConverter(34),
        color: '#998787',
        fontSize: dimConverter(30),
        fontFamily: 'Roboto-Regular'
    },
    text_saludo: {
        top: dimConverter(95),
        position: 'absolute',
        width: dimConverter(529),
        color: 'white',
        fontSize: dimConverter(50),
        fontFamily: 'Roboto-Regular'
    },
    text_resumen: {
        top: dimConverter(159),
        position: 'absolute',
        width: dimConverter(529),
        color: 'white',
        fontSize: dimConverter(28),
        fontFamily: 'Roboto-Regular'
    },
    body: {
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%'
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
    },
    tex_deben_debes: {
        marginTop: dimConverter(55),
        color: '#6F6C6C',
        fontSize: dimConverter(36),
        fontFamily: 'Roboto-Regular'
    },
    text_valor: {
        marginTop: dimConverter(24),
        color: '#383737',
        fontSize: dimConverter(50),
        fontFamily: 'Roboto-Regular'
    },
    text_ver_detalles: {
        marginTop: dimConverter(6),
        color: '#0A90FB',
        fontSize: dimConverter(30),
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold'
    }

})
