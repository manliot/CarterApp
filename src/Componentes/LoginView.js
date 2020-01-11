'use strict'
//Imports
import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableHighlight, Alert, ImageBackground, StyleSheet, TextInput } from 'react-native' //Components used
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
            dataBase:db
        };

    }
    render() {
        return (
            <ImageBackground style={styles.container} source={{ uri: 'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>
                <View style={styles.container} >
                    <Text style={styles.title}> CarterAPP  </Text>

                    {/*  onChangeText: update the state with the text in the textInput*/}
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='UserName' onChangeText={(text) => this.setState({ usuario: text })} />                                       
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='Password' onChangeText={(text) => this.setState({ contraseña: text })} />


                    <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.button}>
                        <Text style={styles.textButton}> Log in </Text>
                    </TouchableHighlight>
                    <TouchableWithoutFeedback onPress={(this.onRegister.bind(this))} style={styles.buttonRegister}>
                        <Text style={styles.textButton}> you don't have account?. click here  </Text>
                    </TouchableWithoutFeedback>

                    <Text style={styles.version}>V 1.0</Text>
                    <Text style={styles.by} >By: Manlio Tejeda</Text>
                </View>
                
            </ImageBackground>
        )
    }
    onRegister(){
        this.props.navigation.navigate('RegisterUser',{param:this.state.dataBase}) // send the DataBase
    }
    onLogin() {// is called when 'Login' Button is pressed
        db.transaction((tx) => {
            const { usuario } = this.state;
            const { contraseña } = this.state;


            //Query 'SELECT * FROM Usuario WHERE Usuario = ? and Contraseña=?'
            tx.executeSql('SELECT * FROM Usuario WHERE Usuario = ? and Contraseña=?', [usuario,contraseña], (tx, res) => {
                const len = res.rows.length;
                console.log('items:', len);
                
                if (len == 1) { //In case of login success
                    const row = res.rows;
                    this.setState({ nombre: row.item(0).Nombre });
                    const { nombre } = this.state;
                    console.log('Resultado del query: ', row.item(0));
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
                                    text: 'Aceptar'
                                }
                            ]
                        )
                    }
                }
            })
        });

    }

    Aceptar() {
        console.log('Login acep')

        this.props.navigation.navigate('Home')
    }
    cancelar() {

        console.log('Login cancelado')
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        marginTop: 160,
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        width: 150,
        height: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
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
        color:'#F5F5DC',
    },
    usYpas: {
        fontSize: 16,
        marginTop: 30,
        color: 'white'
    },
    textIn: {
        marginTop: 45,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'white',
        borderBottomColor :'white'       
    },
    version: {
        marginLeft:380,
        marginTop: 188,
        fontSize: 11,
        color: 'white',

    },
    by:{   
        marginLeft:300,
        fontSize: 11,
        color: 'white',
    }
})
//export default LoginView;
module.exports = LoginView;