import { StyleSheet, Dimensions } from 'react-native'

const width = (Dimensions.get('window').width)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subTitle: {
        fontSize: 15,
        color: 'black',
        position: 'relative',
        top: -75,
        color: 'gray',
    },
})
module.exports = styles;