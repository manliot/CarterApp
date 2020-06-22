import { StyleSheet } from 'react-native'
import pixelConverter from '../utils/dimxPixels'
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

module.exports = styles;