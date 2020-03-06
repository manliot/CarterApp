import React, { Component } from 'react';
import { Text, StyleSheet, Alert, View, TextInput, ScrollView, TouchableHighlight, Dimensions, KeyboardAvoidingView } from 'react-native';
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
    componentDidMount() {
        const { navigation } = this.props;
        const DataBase = JSON.stringify(navigation.getParam('param', 'default value'));
        this.setState({ bd: DataBase })
    }
    render() {
        return (
            <View style={styles.container} >
                <ScrollView>
                    <View style={styles.body}>
                        <Text style={styles.title}> Sing Up  </Text>
                        <Text style={styles.title2}> Please, Complete all the information to a success register   </Text>
                        <TextInput style={styles.textIn1} autoFocus={true} placeholderTextColor='grey' placeholder='Name' onChangeText={(text) => this.setState({ Name: text })} onSubmitEditing={(event) => { this.refs._2.focus(); }} />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='LastName' onChangeText={(text) => this.setState({ LastName: text })} ref='_2' onSubmitEditing={(event) => { this.refs._3.focus(); }} />
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='Age' onChangeText={(text) => this.setState({ Age: text })} onSubmitEditing={(event) => { this.refs._4.focus(); }} ref='_3'/>
                        <TextInput style={styles.textIn} placeholderTextColor='grey' placeholder='UserName' onChangeText={(text) => this.setState({ UserName: text })} onSubmitEditing={(event) => { this.refs._5.focus(); }}ref='_4' />
                        <TextInput secureTextEntry={true} style={styles.textIn} placeholderTextColor='grey' placeholder='Password' onChangeText={(text) => this.setState({ Password: text })} ref='_5'/>
                        <TouchableHighlight onPress={(this.onRegister.bind(this))} style={styles.button}>
                            <Text style={styles.textButton}> Register </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View >
        );
    }
    onExit() {
        this.props.navigation.navigate('Login')
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
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
                    [UserName, Password, Name, LastName, Age],
                    (tx, res) => {
                        console.log('QUERY', res)
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
                            alert('Registration Failed');
                        }
                    }
                )
            });
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfcff',
        flexDirection: 'column'
    },
    title2: {
        width: Dimensions.get('window').width,
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
        borderBottomColor: 'black'
    },
    textIn: {
        marginTop: 25,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'black'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
        height: 30,
        backgroundColor: '#3e64ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1
    }
    , textButton: {
        color: '#F5F5DC',
    },
})

module.exports = RegisterUser;