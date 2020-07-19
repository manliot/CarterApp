import { StyleSheet } from 'react-native'
import pixelConverter from '../utils/dimxPixels'
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    header: {
        height: pixelConverter(385),
        backgroundColor: '#65d359',
        color: 'white',
        alignItems: 'center'
    },
    ViewDraw: {
        width: '100%',
        alignItems: 'flex-end'
    },
    icon_drawMenu: {
        height: pixelConverter(88),
        width: pixelConverter(88),
        marginRight: 5,
        marginTop: 2.5,
    },
    text_saludo: {
        top: pixelConverter(95),
        position: 'absolute',
        width: pixelConverter(529),
        color: 'white',
        fontSize: pixelConverter(50),
        fontFamily: 'Roboto-Regular',
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
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: '100%'
    },
    box: {
        backgroundColor: '#fff',
        elevation: 5,
        marginTop: -pixelConverter(138),
        flex: 0.9,
        borderRadius: pixelConverter(32),
        width: pixelConverter(529),
        paddingStart: pixelConverter(55),
        paddingTop: pixelConverter(46),
        paddingBottom: pixelConverter(46)
    },
    nombre_box: {
        textAlign: 'right',
        marginRight: pixelConverter(34),
        color: '#998787',
        fontSize: pixelConverter(30),
        fontFamily: 'Roboto-Regular'
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
    },
    FABbutton: {
        flex: 0.1,
        position: 'absolute',
        elevation: 10,
        borderRadius: pixelConverter(100),
        height: pixelConverter(120),
        width: pixelConverter(120),
        right: pixelConverter(30),
        bottom: pixelConverter(20)
    }
})
module.exports = styles;