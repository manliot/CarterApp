import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';
import 'intl';
import 'intl/locale-data/jsonp/es-CO'; // or any other locale you need

import { UpdateDEBEN, UpdateDEBES } from '../actions/actions'
import pixelConverter from '../utils/dimxPixels'

import actualizar from '../utils/actualizar'

const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
class NewPricipal extends Component {
    componentDidMount() {
        this.ActualizaMonto()
    }
    async ActualizaMonto() {
        const MontoDebenList = await actualizar('SELECT Monto FROM DebenList WHERE Usuario=?', this.props.usuario, this.props.db)
        const MontoDeboList = await actualizar('SELECT Monto FROM DeboList WHERE Usuario=?', this.props.usuario, this.props.db)
        this.props.UpdateDEBEN_(MontoDebenList)
        this.props.UpdateDEBES_(MontoDeboList)
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={payload => {
                        if (this.props.refresh) {
                            this.ActualizaMonto()
                            this.props.RefreshFalse()
                        }
                    }}
                />
                <View style={styles.header}>
                    <Image style={{ height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/user.png')}></Image>
                    <Text style={styles.text_saludo}>¡Hola {this.props.usuario}!</Text>
                    <Text style={styles.text_resumen}>Este es tu resumen actual...</Text>
                </View>
                <View style={styles.body}>
                    <View style={[styles.box, {}]}>
                        <Text style={[styles.nombre_box]}>Principal</Text>
                        <Text style={[styles.tex_deben_debes, { marginTop: pixelConverter(49) }]}>Te deben</Text>
                        <Text style={[styles.text_valor]}>{formatter.format(this.props.TotalDeben)}</Text>
                        <Text style={[styles.text_ver_detalles]} onPress={() => { this.props.navigation.navigate('ListaPrestamos') }}>VER DETALLES</Text>
                        <Text style={[styles.tex_deben_debes]}>Debes</Text>
                        <Text style={[styles.text_valor]}>{formatter.format(this.props.TotalDebes)}</Text>
                        <Text style={[styles.text_ver_detalles]} onPress={() => { this.props.navigation.navigate('ListaDeudas') }}>VER DETALLES</Text>
                    </View>
                    <TouchableOpacity onPress={this.openDrawer.bind(this)} style={{ elevation: 10, width: '100%', borderRadius: pixelConverter(100), height: pixelConverter(120), width: pixelConverter(120), marginTop: pixelConverter(-132), position: 'absolute', right: pixelConverter(30), bottom: pixelConverter(410) }} >
                        <Image style={{ height: pixelConverter(120), width: pixelConverter(120) }} source={require('../../assets/images/plus.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    openDrawer() {
        this.props.navigation.openDrawer()
    }
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

const mapStateToProps = (state) => {
    return {
        db: state.db,
        nombre: state.nombre,
        usuario: state.usuario,
        TotalDeben: state.debenT,
        TotalDebes: state.debesT,
        TotalCartera: state.cartera,
        ultimaVez: state.ultimaVez,

    }
}
const mapDispathToProps = (dispath) => {
    return {
        UpdateDEBEN_: (deben) => dispath(UpdateDEBEN(deben)),
        UpdateDEBES_: (debes) => dispath(UpdateDEBES(debes)),
    }
}
export default connect(mapStateToProps, mapDispathToProps)(React.memo(NewPricipal))