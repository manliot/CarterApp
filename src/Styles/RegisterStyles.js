import { StyleSheet, Dimensions } from 'react-native'

const width = (Dimensions.get('window').width)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flex: 1,
        marginTop: "5%",
        fontSize: 20,
        color: 'black',
        marginLeft: (width / 2) - 60,
    },
    subTitle: {
        fontSize: 15,
        color: 'black',
    },
    textInput1: {
        marginTop: '10%',
        width: '75%',
        height: (Dimensions.get('window').height * 40) / 720,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
})
module.exports = styles;