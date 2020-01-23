import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, ImageBackground, TouchableHighlight,Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase

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
class AddNewPrestamo extends Component {
    constructor() {
        super()
        this.state = {
            Monto: '',
            Nombre: '',
            concepto: '',
            usuario: '',
            date: ''
        }
    }
    render() {
        return (
            <ImageBackground style={styles.container} source={{ uri: 'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>

                <View style={styles.container}>
                    <Text>Nuevo prestamo</Text>
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='Monto' onChangeText={(text) => this.setState({ Monto: text })} />
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='Name deudor' onChangeText={(text) => this.setState({ Nombre: text })} />
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='concepto' onChangeText={(text) => this.setState({ concepto: text })} />
                    <TouchableHighlight onPress={(this.onAdd.bind(this))} style={styles.button}>
                        <Text style={styles.textButton}> Add </Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>

        );
    }
    
    onAdd() {
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        this.setState({
            //Setting the value of the date time
            date:
                //date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
                date + '/' + month + '/' + year ,
            });

        const { Monto } = this.state
        const { Nombre } = this.state
        const { concepto } = this.state

        const { params } = this.props.navigation.state;
        console.log(params.usuario)
        this.setState({ usuario: params.usuario })
        //INSERT INTO DebenList (Monto,Nombre,Concepto,Fecha,Usuario) VALUES(1000,"alguien","uBER","20/1/20","ADMIN")
        if (Monto == '') {

        } else {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO DebenList (Monto,Nombre,Concepto,Fecha,Usuario) VALUES(?,?,?,?,?)',
                    [Monto, Nombre, concepto, this.state.date, this.state.usuario], (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Success',
                                'You are Registered Successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () =>
                                            this.props.navigation.navigate('Home'),
                                    },
                                ],
                                { cancelable: false }
                            );
                        } else {
                            alert('Registration Failed');
                        }
                    })
            })
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    header: {
        flex: 0.07,
        justifyContent: 'flex-end',
        backgroundColor: '#f05855'

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
    textButton: {
        color: '#F5F5DC',
    },
    button2: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1
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

module.exports = AddNewPrestamo;