import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationEvents } from 'react-navigation';
const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
import { UpdateDEBEN, UpdateDEBES, RefreshFalse } from '../actions/actions'
import pixelConverter from '../utils/dimxPixels'
import actualizar from '../utils/actualizar'
import 'intl';
import 'intl/locale-data/jsonp/es-CO'; // or any other locale you need
const styles = require('../Styles/principal')

const Principal = ({ route, navigation }) => {
    const db = useSelector(state => state.db)
    const nombre = useSelector(state => state.nombre)
    const usuario = useSelector(state => state.usuario)
    let TotalDeben = useSelector(state => state.debenT)
    let TotalDebes = useSelector(state => state.debesT)
    let TotalCartera = useSelector(state => state.cartera)
    const ultimaVez = useSelector(state => state.ultimaVez)
    let refresh = useSelector(state => state.refresh)
    const dispatch = useDispatch()
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
                <View style={styles.ViewDraw}>
                    <Image style={styles.icon_drawMenu} source={require('../../assets/images/user.png')} />
                </View>
                <Text style={styles.text_saludo}>¡Hola {nombre}!</Text>
                <Text style={styles.text_resumen}>Este es tu resumen actual...</Text>
            </View>
            <View style={styles.body}>
                <View style={[styles.box]}>
                    <Text style={[styles.nombre_box]}>Principal</Text>
                    <Text style={[styles.tex_deben_debes, { marginTop: pixelConverter(49) }]}>Te deben</Text>
                    <Text style={[styles.text_valor]}>{formatter.format(TotalDeben)}</Text>
                    <Text style={[styles.text_ver_detalles]} onPress={() => { navigation.navigate('ListaPrestamos') }}>VER DETALLES</Text>
                    <Text style={[styles.tex_deben_debes]}>Debes</Text>
                    <Text style={[styles.text_valor]}>{formatter.format(TotalDebes)}</Text>
                    <Text style={[styles.text_ver_detalles]} onPress={() => { navigation.navigate('ListaDeudas') }}>VER DETALLES</Text>
                </View>
                <TouchableOpacity onPress={openDrawer} style={styles.FABbutton} >
                    <Image style={{ height: pixelConverter(120), width: pixelConverter(120) }} source={require('../../assets/images/plus.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Principal