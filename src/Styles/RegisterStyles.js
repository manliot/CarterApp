import { StyleSheet, Dimensions } from 'react-native'

const width = (Dimensions.get('window').width)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#65d359',
    },
    subTitle: {
        fontSize: 15,
        color: 'black',
        top: -75,
        color: 'gray',
    },
    goBack: {
        width: 40,
        alignItems: 'center',
        top: -108,
        left: '44%'
    }
})
module.exports = styles;