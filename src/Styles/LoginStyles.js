import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: '#3e64ff',
        fontWeight: 'bold'
    },
    textInput1: {
        marginTop: (Dimensions.get('window').height * 100) / 730,
        width: '75%',
        height: (Dimensions.get('window').height * 40) / 720,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
    textInput2: {
        marginTop: '15%',
        width: '75%',
        height: (Dimensions.get('window').height * 40) / 720,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
    button: {
        width: '65%',
        height: 40,
        backgroundColor: '#3e64ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1
    },
    textButton: {
        color: 'gray',
    },
    versionView: {
        flex: 0.08,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
    },
    version: {
        fontSize: 11,
        color: 'grey',
        backgroundColor: '#ecfcff'
    },
})
module.exports = styles;