import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationEvents } from 'react-navigation';
import 'intl';
import 'intl/locale-data/jsonp/es-CO'; // or any other locale you need

import { UpdateDEBEN, UpdateDEBES, RefreshFalse } from '../actions/actions'
import pixelConverter from '../utils/dimxPixels'

import actualizar from '../utils/actualizar'

const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })

const Principal = ({ route, navigation }) => {
    //gobalState
    const db = useSelector(state => state.db)
    const nombre = useSelector(state => state.nombre)
    const usuario = useSelector(state => state.usuario)
    let TotalDeben = useSelector(state => state.debenT)
    let TotalDebes = useSelector(state => state.debesT)
    let TotalCartera = useSelector(state => state.cartera)
    const ultimaVez = useSelector(state => state.ultimaVez)
    let refresh = useSelector(state => state.refresh)
    //dispach
    const dispatch = useDispatch()
    //methods
    async function ActualizaMonto() {
        const MontoDebenList = await actualizar('SELECT Monto FROM DebenList WHERE Usuario=?', usuario, db)
        const MontoDeboList = await actualizar('SELECT Monto FROM DeboList WHERE Usuario=?', usuario, db)
        dispatch(UpdateDEBEN(MontoDebenList))
        dispatch(UpdateDEBES(MontoDeboList))
    }
    useEffect(() => {
        ActualizaMonto()
    }, [TotalDeben, TotalDebes, TotalCartera])
    const openDrawer = () => {
        this.props.navigation.openDrawer()
    }
    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillFocus={payload => {
                    if (refresh) {
                        ActualizaMonto()
                        dispatch(RefreshFalse())
                    }
                }}
            />
            <View style={styles.header}>
                <Image style={{ height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/user.png')} />
                <Text style={styles.text_saludo}>¡Hola {nombre}!</Text>
                <Text style={styles.text_resumen}>Este es tu resumen actual...</Text>
            </View>
            <View style={styles.body}>
                <View style={[styles.box, {}]}>
                    <Text style={[styles.nombre_box]}>Principal</Text>
                    <Text style={[styles.tex_deben_debes, { marginTop: pixelConverter(49) }]}>Te deben</Text>
                    <Text style={[styles.text_valor]}>{formatter.format(TotalDeben)}</Text>
                    <Text style={[styles.text_ver_detalles]} onPress={() => { navigation.navigate('ListaPrestamos') }}>VER DETALLES</Text>
                    <Text style={[styles.tex_deben_debes]}>Debes</Text>
                    <Text style={[styles.text_valor]}>{formatter.format(TotalDebes)}</Text>
                    <Text style={[styles.text_ver_detalles]} onPress={() => { navigation.navigate('ListaDeudas') }}>VER DETALLES</Text>
                </View>
                <TouchableOpacity onPress={openDrawer} style={{ elevation: 10, width: '100%', borderRadius: pixelConverter(100), height: pixelConverter(120), width: pixelConverter(120), marginTop: pixelConverter(-132), position: 'absolute', right: pixelConverter(30), bottom: pixelConverter(410) }} >
                    <Image style={{ height: pixelConverter(120), width: pixelConverter(120) }} source={require('../../assets/images/plus.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'blue'
    },
    header: {
        height: pixelConverter(385),
        backgroundColor: '#65d359',
        color: 'white',
        alignItems: 'center'
    },
    nombre_box: {
        textAlign: 'right',
        marginRight: pixelConverter(34),
        color: '#998787',
        fontSize: pixelConverter(30),
        fontFamily: 'Roboto-Regular'
    },
    text_saludo: {
        top: pixelConverter(95),
        position: 'absolute',
        width: pixelConverter(529),
        color: 'white',
        fontSize: pixelConverter(50),
        fontFamily: 'Roboto-Regular'
    },
    text_resumen: {
        top: pixelConverter(159),
        position: 'absolute',
        width: pixelConverter(529),
        color: 'white',
        fontSize: pixelConverter(28),
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
        marginTop: -pixelConverter(138),
        height: '70%',
        borderRadius: pixelConverter(32),
        width: pixelConverter(529),
        paddingStart: pixelConverter(55),
        paddingTop: pixelConverter(46)
    },
    tex_deben_debes: {
        marginTop: pixelConverter(55),
        color: '#6F6C6C',
        fontSize: pixelConverter(36),
        fontFamily: 'Roboto-Regular'
    },
    text_valor: {
        marginTop: pixelConverter(24),
        color: '#383737',
        fontSize: pixelConverter(50),
        fontFamily: 'Roboto-Regular'
    },
    text_ver_detalles: {
        marginTop: pixelConverter(6),
        color: '#0A90FB',
        fontSize: pixelConverter(30),
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold'
    }

})
export default Principal