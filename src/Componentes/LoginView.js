
//Imports Components
import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableHighlight, Alert, TextInput, ScrollView } from 'react-native'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'

//ACTIONS --> Redux --> Global State
/*===========================================
 sera usado para actualizar el estado global 
 con el usuario que se logueo en la app 
==============================================*/
import { SetInfoUser } from '../actions/actions'

//styles
const styles = require("../Styles/LoginStyles")

class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = { //this state is used to search the user in the DataBase (Log in)
            usuario: '',
            contraseña: '',
        };
    }
    render() {
        return (
            <Content style={{ backgroundColor: '#ecfcff' }}>
                <ScrollView>
                    <Container style={styles.container}>
                        <Text style={styles.title}>CarterAPP</Text>
                        {/*  onChangeText: update the state with the text in the textInput*/}
                        <TextInput style={styles.textInput1} placeholderTextColor='grey' placeholder='Usuario' onChangeText={(text) => this.setState({ usuario: text })} onSubmitEditing={(event) => { this.refs.contraseña.focus(); }} />
                        <TextInput secureTextEntry={true} style={styles.textInput2} placeholderTextColor='grey' placeholder='Contraseña' onChangeText={(text) => this.setState({ contraseña: text })} ref='contraseña' onSubmitEditing={this.onLogin.bind(this)} />
                        <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.button}>
                            <Text style={{ color: 'white' }}> Log in </Text>
                        </TouchableHighlight>
                        <TouchableWithoutFeedback onPress={(this.onRegister.bind(this))} style={styles.buttonRegister}>
                            <Text style={styles.textButton}>No estas Registrado? Click aqui</Text>
                        </TouchableWithoutFeedback>
                    </Container>
                </ScrollView>
                <View style={styles.versionView}>
                    <Text style={styles.version}>V 1.0</Text>
                    <Text style={styles.version} >By: Manlio Tejeda</Text>
                </View>
            </Content>
        )
    }
    onRegister() {//navega hasta RegisterUser
        this.props.navigation.navigate('RegisterUser')
    }
    borrar() {// to delete a user //npt necesary
        this.props.db.transaction(tx => {
            tx.executeSql('DELETE FROM  DebenList WHERE Usuario=?', ['Admin'],
                (tx, res) => {
                    for (let i = 0; i < res.rows.length; i++) {
                        console.log(i + '): ' + res.rows.item(i).Nombre)
                    }
                }
            )
        })
    }
    Mostrarlista() {//to see all the users //npt necesary
        this.props.db.transaction(tx => {
            tx.executeSql('SELECT * FROM  Usuario ', [],
                (tx, res) => {
                    for (let i = 0; i < res.rows.length; i++) {
                        console.log(i + '): ' + res.rows.item(i).Usuario)
                    }
                }
            )
        })
    }
    onLogin() {//consulta en la base de datos con el estado del componente  
        //en caso logueo correcto, notifica, actualiza el estado global y navega hacia el home o ventaa principal
        this.props.db.transaction((tx) => {
            const { usuario } = this.state;
            const { contraseña } = this.state;
            tx.executeSql('SELECT * FROM Usuario WHERE Usuario = ? and Contraseña=?', [usuario, contraseña], (tx, res) => {
                const len = res.rows.length;//<-- 0 in case of no users register
                if (len == 1) {
                    const row = res.rows;
                    /** ===================
                    down we update the global state with the result of the query (Nombre and  Usuario)
                    to be used in Componente_Lista for get the information.
                    ============================================================================*/
                    this.props.set_User_Name(row.item(0).Nombre, row.item(0).Usuario)
                    Alert.alert(
                        `Bienvenido ${this.props.nombre}!`,
                        'Has ingresado satifactoriamente',
                        [
                            {
                                text: 'Vamos!',
                                onPress: this.Aceptar.bind(this)
                            }, {
                                text: 'Cancelar',
                            }
                        ]
                    )
                } else {
                    if (len == 0) {
                        Alert.alert(
                            'Intenta de nuevo',
                            'Usuario o Contraseña Incorrecta ',
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
        this.props.navigation.navigate('Home')
    }
}

//nos permite acceder al estado por medio de props
const mapStateToProps = (state) => {
    return {
        db: state.db,
        nombre: state.nombre,
        usuario: state.usuario
    }
}
//permite llamar acciones de los reducers para cambiar el estado global
const mapDispathToProps = (dispath) => {
    return {
        set_User_Name: (nombre, usuario) => {
            return dispath(SetInfoUser(nombre, usuario))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(LoginView);
