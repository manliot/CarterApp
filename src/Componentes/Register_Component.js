import React, { Component } from 'react';
import { Text, StyleSheet, Alert, View, TextInput, ScrollView, TouchableHighlight, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { Header, Right, Toast, Card } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'

const height = (Dimensions.get('window').height)
const width = (Dimensions.get('window').width)
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
                <Header transparent>
                    <Text style={styles.title}> Sing Up  </Text>
                    <Right>
                        <TouchableHighlight activeOpacity={1} underlayColor='#ecfcff' style={{ width: 40, alignItems: 'center', }} onPress={() => { this.props.navigation.goBack() }}>
                            <Feather name='x-circle' size={25} />
                        </TouchableHighlight>
                    </Right>

                </Header >
                <ScrollView>
                    <View style={styles.body}>
                        <Text style={styles.title2}> Por favor, completa todos los campos. </Text>
                        <TextInput style={styles.textIn1} autoFocus={true} placeholderTextColor='grey' placeholder='Nombre*' onChangeText={(text) => this.setState({ Name: text })} onSubmitEditing={(event) => { this.refs.lastname.focus(); }} ref='name' />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='Apellido*' onChangeText={(text) => this.setState({ LastName: text })} ref='lastname' onSubmitEditing={(event) => { this.refs.edad.focus(); }} />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' keyboardType='numeric' placeholder='Edad*' onChangeText={(text) => this.setState({ Age: text })} onSubmitEditing={(event) => { this.refs.username.focus(); }} ref='edad' />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='Usuario*' onChangeText={(text) => this.setState({ UserName: text })} onSubmitEditing={(event) => { this.refs.password.focus(); }} ref='username' />
                        <TextInput secureTextEntry={true} style={styles.textIn} placeholderTextColor='grey' placeholder='Contraseña*' onChangeText={(text) => this.setState({ Password: text })} ref='password' />
                        <TouchableHighlight onPress={(this.onRegister.bind(this))} style={styles.button} ref='registrarse'>
                            <Text style={styles.textButton}> Registrarse </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View >
        );
    }
    vaciarFormulario() {
        this.refs.name.value = ''
        this.refs.lastname.value = ''
        this.refs.edad.value = ''
        this.refs.username.value = ''
        this.refs.password.value = ''
    }
    onRegister() {
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
                                /*Alert.alert(
                                    'Success',
                                    'You are Registered Successfuly',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => this.props.navigation.goBack()
                                        }
                                    ]
                                );*/
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfcff',
        // flexDirection: 'column'
    },
    title2: {
        marginTop: 30,
        fontSize: 15,
        color: 'black',
    },
    title: {
        flex: 1,
        marginTop: 13,
        fontSize: 20,
        color: 'black',
        marginLeft: (width / 2) - 60,
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