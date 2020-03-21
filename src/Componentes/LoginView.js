
//Imports Components
import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableHighlight, Alert, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native' //Components used
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'

//ACTIONS (Redux) (Global State)
import { SetInfoUser } from '../actions/actions'

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
            <Container style={{ backgroundColor: '#ecfcff' }}>
                <Content style={{ backgroundColor: '#ecfcff' }}>
                    <ScrollView>
                        <View style={styles.container} >
                            <Text style={styles.title}>CarterAPP</Text>

                            {/*  onChangeText: update the state with the text in the textInput*/}
                            <TextInput style={styles.textIn1} placeholderTextColor='grey' placeholder='Usuario' onChangeText={(text) => this.setState({ usuario: text })} onSubmitEditing={(event) => { this.refs._2.focus(); }} />
                            <TextInput secureTextEntry={true} style={styles.textIn2} placeholderTextColor='grey' placeholder='Contraseña' onChangeText={(text) => this.setState({ contraseña: text })} ref='_2' />

                            <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.button}>
                                <Text style={{ color: 'white' }}> Log in </Text>
                            </TouchableHighlight>
                            <TouchableWithoutFeedback onPress={(this.onRegister.bind(this))} style={styles.buttonRegister}>
                                <Text style={styles.textButton}>No estas Registrado? Click aqui</Text>
                            </TouchableWithoutFeedback>

                        </View>
                    </ScrollView>
                </Content>
                <View style={styles.versionView}>
                    <Text style={styles.version}>V 1.0</Text>
                    <Text style={styles.version} >By: Manlio Tejeda</Text>
                </View>
            </Container>
        )
    }
    onRegister() {//to register new users
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
    onLogin() {// is called when 'Login' Button is pressed
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




const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        //backgroundColor: '#ecfcff'
    },
    title: {
        paddingTop: (Dimensions.get('window').width * 350) / 1560,
        fontSize: 50,
        color: '#3e64ff',
        fontWeight: 'bold'
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#3e64ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1
    },
    buttonRegister: {
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textButton: {
        color: 'gray',
    },
    textIn1: {
        marginTop: (Dimensions.get('window').height * 100) / 720,
        width: 270,
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
        width: Dimensions.get('window').width,
        backgroundColor: '#ecfcff'
    },
    version: {
        fontSize: 11,
        color: 'grey',
    },
})
const mapStateToProps = (state) => {
    return {
        db: state.db,
        nombre: state.nombre,
        usuario: state.usuario
    }
}
const mapDispathToProps = (dispath) => {
    return {
        set_User_Name: (nombre, usuario) => {
            return dispath(SetInfoUser(nombre, usuario))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(LoginView);
