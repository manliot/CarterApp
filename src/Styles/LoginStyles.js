import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    fondo: {

    },
    container: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: '100%',
    },
    title: {
        fontSize: 50,
        color: 'white',
        fontFamily: 'LilitaOne-Regular',
        textAlign: 'center',
        marginTop: '30%'
    },
    box: {
        alignItems: 'center',
        marginTop: (Dimensions.get('window').height * 50) / 730,
        paddingTop: 30,
        paddingBottom: 45,
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
    },
    textForm: {
        fontSize: 16,
        color: '#2c3e50',
        marginBottom: 10,
        fontFamily: 'Roboto-Light',
        fontWeight: "500",
        textAlign: 'center',
        marginTop: -70
    },
    textInput: {
        width: '75%',
        height: 40,
        color: 'black',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        padding: 1.5,
        marginBottom: 15,
        fontFamily: 'Roboto-Light',
    },
    button: {
        width: '65%',
        height: 40,
        backgroundColor: '#65d359',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    textButton: {
        color: 'gray',
        fontFamily: 'Roboto-Light',
    }
})
module.exports = styles;