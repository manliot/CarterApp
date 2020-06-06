import React, { Component } from 'react';
import { Text, Alert, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { Header, Right, Toast, Container } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'

//styles
const stylesRegister = require("../Styles/RegisterStyles")
const stylesLogin = require("../Styles/LoginStyles")


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
            <View style={stylesRegister.container} >
                <Header transparent>
                    <Text style={stylesRegister.title}> Sing Up  </Text>
                    <Right>
                        <TouchableHighlight activeOpacity={1} underlayColor='#ecfcff' style={{ width: '40%', alignItems: 'center' }} onPress={() => { this.props.navigation.goBack() }}>
                            <Feather name='x-circle' size={25} />
                        </TouchableHighlight>
                    </Right>
                </Header >
                <ScrollView style={{ backgroundColor: '#ecfcff' }} >
                    <Container style={{ alignItems: 'center', marginTop: '3%' }}>
                        <Text style={stylesRegister.subTitle}> Por favor, completa todos los campos. </Text>
                        <TextInput style={stylesRegister.textInput1} autoFocus={true} placeholderTextColor='grey' placeholder='Nombre*' onChangeText={(text) => this.setState({ Name: text })} onSubmitEditing={(event) => { this.refs.lastname.focus(); }} ref='name' />
                        <TextInput style={stylesRegister.textInput1} placeholderTextColor='grey' placeholder='Apellido*' onChangeText={(text) => this.setState({ LastName: text })} ref='lastname' onSubmitEditing={(event) => { this.refs.edad.focus(); }} />
                        <TextInput style={stylesRegister.textInput1} placeholderTextColor='grey' keyboardType='numeric' placeholder='Edad*' onChangeText={(text) => this.setState({ Age: text })} onSubmitEditing={(event) => { this.refs.username.focus(); }} ref='edad' />
                        <TextInput style={stylesRegister.textInput1} placeholderTextColor='grey' placeholder='Usuario*' onChangeText={(text) => this.setState({ UserName: text })} onSubmitEditing={(event) => { this.refs.password.focus(); }} ref='username' />
                        <TextInput style={stylesRegister.textInput1} secureTextEntry={true} placeholderTextColor='grey' placeholder='Contraseña*' onChangeText={(text) => this.setState({ Password: text })} ref='password' />
                        <TouchableHighlight onPress={(this.onRegister.bind(this))} style={stylesLogin.button} ref='registrarse'>
                            <Text style={{ color: 'white' }}> Registrarse </Text>
                        </TouchableHighlight>
                    </Container>
                </ScrollView>
            </View >
        );
    }
    vaciarFormulario() {// vacia el formulario
        this.refs.name.value = ''
        this.refs.lastname.value = ''
        this.refs.edad.value = ''
        this.refs.username.value = ''
        this.refs.password.value = ''
    }
    onRegister() {//realiza un query a la base de datos para añadir un nuevo usuario.
        const { Name } = this.state;
        const { LastName } = this.state;
        const { Age } = this.state;
        const { UserName } = this.state;
        const { Password } = this.state;
        if (Name == '' || LastName == '' || Age == '' || UserName == '' || Password == '') {
            // Alert.alert('', 'Please, Complete all the Information')
            this.refs.name.value = ''
            Toast.show(
                {
                    text: 'Please, Complete all the Information',
                    buttonText: 'Ok', position: 'bottom',
                    type: "warning", onClose: () => { console.log('pero que ha pasao') },
                    duration: 30000,
                }
            )
        } else {
            if (!isNaN(Age)) {
                this.vaciarFormulario
                this.props.db.transaction(tx => {
                    tx.executeSql(
                        'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
                        [UserName, Password, Name, LastName, Age],
                        (tx, res) => {
                            if (res.rowsAffected > 0) {
                                Toast.show(
                                    {
                                        text: 'Fuiste registrado satifactoriamente',
                                        buttonText: 'Ok', position: 'bottom',
                                        type: "success", onClose: () => { this.props.navigation.goBack() },
                                        duration: 30000,
                                    }
                                )
                            } else {
                                Toast.show(
                                    {
                                        text: 'Error al registrarse, Vuela a intentar',
                                        buttonText: 'Okay', position: 'bottom',
                                        type: "danger", onClose: () => { console.log('pero que ha pasao') }
                                    }
                                )
                                alert('fallo al registrarse');
                            }
                        }
                    )
                }, () => {
                    this.refs.username.value = ''
                    Toast.show(
                        {
                            text: 'Este usuario ya fue escogido :c',
                            buttonText: 'Okay', position: 'bottom',
                            type: "danger", onClose: () => { console.log('pero que ha pasao') }
                        }
                    )
                });
            } else {
                Alert.alert('', 'La edad tiene que ser un valor numerico')
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        db: state.db
    }
}
export default connect(mapStateToProps)(RegisterUser);