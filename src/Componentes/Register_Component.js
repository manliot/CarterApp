import React, { Component } from 'react';
import { Text, StyleSheet, Alert, View, TextInput, ScrollView, TouchableHighlight, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'

class RegisterUser extends Component {
    constructor() {
        super()
        this.state = {
            Name: '',
            LastName: '',
            Age: '',
            UserName: '',
            Password: '',
        }
    }
    render() {
        return (
            <View style={styles.container} >
                <ScrollView>
                    <View style={styles.body}>
                        <Text style={styles.title}> Sing Up  </Text>
                        <Text style={styles.title2}> Por favor, completa todos los campos. </Text>
                        <TextInput style={styles.textIn1} autoFocus={true} placeholderTextColor='grey' placeholder='Nombre*' onChangeText={(text) => this.setState({ Name: text })} onSubmitEditing={(event) => { this.refs._2.focus(); }} />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='Apellido*' onChangeText={(text) => this.setState({ LastName: text })} ref='_2' onSubmitEditing={(event) => { this.refs._3.focus(); }} />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='Edad*' onChangeText={(text) => this.setState({ Age: text })} onSubmitEditing={(event) => { this.refs._4.focus(); }} ref='_3' />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='Usuario*' onChangeText={(text) => this.setState({ UserName: text })} onSubmitEditing={(event) => { this.refs._5.focus(); }} ref='_4' />
                        <TextInput secureTextEntry={true} style={styles.textIn} placeholderTextColor='grey' placeholder='Contraseña*' onChangeText={(text) => this.setState({ Password: text })} ref='_5' />
                        <TouchableHighlight onPress={(this.onRegister.bind(this))} style={styles.button}>
                            <Text style={styles.textButton}> Register </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View >
        );
    }
    onRegister() {
        const { Name } = this.state;
        const { LastName } = this.state;
        const { Age } = this.state;
        const { UserName } = this.state;
        const { Password } = this.state;
        if (Name == '' || LastName == '' || Age == '' || UserName == '' || Password == '') {
            Alert.alert('', 'Please, Complete all the Information')
        } else {
            if (!isNaN(Age)) {
                this.props.db.transaction(tx => {
                    tx.executeSql(
                        'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
                        [UserName, Password, Name, LastName, Age],
                        (tx, res) => {
                            if (res.rowsAffected > 0) {
                                Alert.alert(
                                    'Success',
                                    'You are Registered Successfuly',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => this.props.navigation.goBack()
                                        }
                                    ]
                                );
                            } else {
                                alert('fallo al registrarse');
                            }
                        }
                    )
                });
            } else {
                Alert.alert('', 'La edad tiene que ser un valor numerico')
            }
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfcff',
        // flexDirection: 'column'
    },
    title2: {
        marginTop: 25,
        fontSize: 15,
        color: 'black',
    },
    title: {
        marginTop: 25,
        fontSize: 20,
        color: 'black',
    },
    textIn1: {
        marginTop: 20,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
    textIn: {
        marginTop: 35,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#3e64ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1
    },
    textButton: {
        color: '#F5F5DC',
    },
})
const mapStateToProps = (state) => {
    return {
        db: state.db
    }
}
export default connect(mapStateToProps)(RegisterUser);