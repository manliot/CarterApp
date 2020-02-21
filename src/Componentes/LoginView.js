'use strict'
//Imports
import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableHighlight, Alert, ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native' //Components used
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase

//Opening DataBase  
const db = openDatabase({
    name: 'posqlitExmple.db',
    createFromLocation: '~www/sqlitExmple.db'
},
    (good) => { //in case of success print in the Console
        console.log('OpenMensaje', good)
    },
    (err) => { // in case of error print in the Console
        console.log('errorMensaje', err)
    }
);


class LoginView extends Component {
    constructor(props) {
        super(props)

        this.state = { //this state is used to search the user in the DataBase (Log in)
            usuario: '',
            contraseña: '',
            nombre: '',
            dataBase: db
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container} >
                    <Text style={styles.title}> CarterAPP  </Text>

                    {/*  onChangeText: update the state with the text in the textInput*/}
                    <TextInput style={styles.textIn1} placeholderTextColor='grey' placeholder='UserName' onChangeText={(text) => this.setState({ usuario: text })} />
                    <TextInput secureTextEntry={true} style={styles.textIn2} placeholderTextColor='grey' placeholder='Password' onChangeText={(text) => this.setState({ contraseña: text })} />


                    <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.button}>
                        <Text style={{ color: 'white' }}> Log in </Text>
                    </TouchableHighlight>
                    <TouchableWithoutFeedback onPress={(this.onRegister.bind(this))} style={styles.buttonRegister}>
                        <Text style={styles.textButton}> you don't have account?. click here  </Text>
                    </TouchableWithoutFeedback>

                </View>
                <View style={styles.versionView}>
                    <Text style={styles.version}>V 1.0</Text>
                    <Text style={styles.version} >By: Manlio Tejeda</Text>
                </View>
            </View>
        )
    }
    onRegister() {//to register new users
        console.log('click registro')
        this.props.navigation.navigate('RegisterUser', { param: this.state.dataBase }) // send the DataBase
    }
    borrar() {// to delete a user 
        db.transaction(tx => {
            console.log('borrar')
            tx.executeSql('DELETE FROM  DebenList WHERE Usuario=?', ['Admin'],
                (tx, res) => {
                    console.log('BO')
                    for (let i = 0; i < res.rows.length; i++) {
                        console.log(i + '): ' + res.rows.item(i).Nombre)
                    }
                }
            )
        })
    }
    Mostrarlista() {//to see all the users
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM  Usuario ', [],
                (tx, res) => {
                    console.log('BO')
                    for (let i = 0; i < res.rows.length; i++) {
                        console.log(i + '): ' + res.rows.item(i).Usuario)
                    }
                }
            )
        })
    }
    onLogin() {// is called when 'Login' Button is pressed
        console.log('click login')
        db.transaction((tx) => {
            const { usuario } = this.state;
            const { contraseña } = this.state;

            //Query 'SELECT * FROM Usuario WHERE Usuario = ? and Contraseña=?'
            tx.executeSql('SELECT * FROM Usuario WHERE Usuario = ? and Contraseña=?', [usuario, contraseña], (tx, res) => {

                const len = res.rows.length;//<-- 0 in case of no users register
                if (len == 1) { //In case of login success

                    //row Have the result of query (in a object)
                    const row = res.rows;

                    // destructuration of object rew
                    this.setState({ nombre: row.item(0).Nombre });
                    const { nombre } = this.state;

                    //console.log('Resultado del query: ', row.item(0));

                    Alert.alert(
                        `Wellcome ${nombre}`,
                        'Login Success',
                        [
                            {
                                text: 'Go!',
                                onPress: (this.Aceptar.bind(this))
                            }, {
                                text: 'Cancel',
                                onPress: (this.cancelar.bind(this))
                            }
                        ]
                    )
                } else {
                    if (len == 0) {
                        Alert.alert(
                            'Try again',
                            'Incorrect username and / or password',
                            [
                                {
                                    text: 'Ok'
                                }
                            ]
                        )
                    }
                }
            })
        });

    }


    Aceptar() {// go to Lista de prestamos
        console.log('Login acep')
        const { usuario } = this.state;
        this.props.navigation.navigate('Home', { usuario: usuario })
    }
    cancelar() {//cancel
        console.log('Login cancelado')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        marginTop: (Dimensions.get('window').width * 350) / 1560,
        fontSize: 50,
        color: '#5564eb',
        fontWeight: 'bold'
    },
    button: {
        width: 150,
        height: 30,
        backgroundColor: '#5564eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1
    },
    buttonRegister: {
        width: 300,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textButton: {
        color: 'gray',
    },
    textIn1: {
        marginTop: (Dimensions.get('window').height * 120) / 720,
        width: 270 ,
        height: (Dimensions.get('window').height * 40) / 720,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
    textIn2: {
        marginTop: 60,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'grey'
    },
    versionView: {
        flex: 0.08,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width
    },
    version: {
        fontSize: 11,
        color: 'grey',
    },
})
//export default LoginView;
module.exports = LoginView;