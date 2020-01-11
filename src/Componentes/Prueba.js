import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput,ImageBackground } from 'react-native';

class prueba extends Component {
    render() {
        return (
            <ImageBackground style={styles.container} source={{ uri: 'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>
                <View style={styles.container}>
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' /*placeholder='User' onChangeText={(text) => this.setState({ usuario: text })}*/ />
                </View>
            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    textIn: {
        marginTop: 45,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'white',
        borderBottomColor: 'white'
    },
})

module.exports = prueba;