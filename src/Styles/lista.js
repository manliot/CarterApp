import { StyleSheet, Dimensions, } from 'react-native'
import pixelConverter from '../utils/dimxPixels'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    header: {
        backgroundColor: '#B2E9AB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: pixelConverter(14),
        width: pixelConverter(470),// si se cambia entonces cambiar en el gettConceptoview
        backgroundColor: '#a7a9a3',
        height: pixelConverter(70),
        borderRadius: pixelConverter(10),
    },
    fecha: {
        marginTop: pixelConverter(50),
        marginBottom: pixelConverter(10),
        color: '#959595',
        fontSize: pixelConverter(28),
    },
    touchableOpacity: {
        padding: pixelConverter(0),
        borderRadius: pixelConverter(10),
    },
    lista: {
        marginTop: pixelConverter(27),
        backgroundColor: '#ecfcff',
        paddingTop: pixelConverter(25),
        paddingBottom: pixelConverter(20),
        paddingEnd: pixelConverter(18),
        paddingStart: pixelConverter(27),
        width: Dimensions.get('window').width - 65,// si se cambia entonces cambiar en el gettConceptoview
        height: pixelConverter(120),
        borderRadius: pixelConverter(10),
        elevation: 5,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    bottom: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    container_lista: {
        alignItems: 'center'
    },
    tex: {
        fontSize: pixelConverter(31),
        color: '#65D359',
        fontFamily: 'Roboto-Bold'
    },
    tex2: {
        color: '#6F6C6C',
        fontSize: pixelConverter(27),
    },
    tex3: {
        fontSize: 16,
        alignItems: 'flex-end',
        fontFamily: 'Roboto-Bold',
        flex: 1,
        textAlign: 'right'
    },
})
module.exports = styles;