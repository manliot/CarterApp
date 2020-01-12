import React, { Component } from 'react';
import { Text, StyleSheet, Alert ,View, TextInput, ImageBackground, TouchableHighlight } from 'react-native';
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
            <ImageBackground style={styles.container} source={{ uri: 'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>
                <View style={styles.container} >
                    <Text style={styles.title}> Please, Complete all the information to a success register   </Text>
                   
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='Name' onChangeText={(text) => this.setState({ Name: text })} />
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='LastName' onChangeText={(text) => this.setState({ LastName: text })} />
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='Age' onChangeText={(text) => this.setState({ Age: text })} />
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='UserName' onChangeText={(text) => this.setState({ UserName: text })} />
                    <TextInput style={styles.textIn} placeholderTextColor='#F5F5DC' placeholder='Password' onChangeText={(text) => this.setState({ Password: text })} />

                    <TouchableHighlight onPress={(this.onRegister.bind(this))} style={styles.button}>
                        <Text style={styles.textButton}> Register </Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>

        );

    }

    onRegister() {
        const { Name } = this.state;
        const { LastName } = this.state;
        const { Age } = this.state;
        const { UserName } = this.state;
        const { Password } = this.state;
        if(Name=='' || LastName=='' || Age==''||UserName==''||Password==''){
            Alert.alert('','Please, Complete all the Information')
        }else{
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
                    [UserName, Password, Name, LastName, Age],
                    (tx, res) => {
                        console.log('aa')
                        Console.log('Resultados',res.rowsAffected);
                        if(res.rowsAffected>0){
                            Alert.alert(
                                'Success',
                                'You are Registered Successfuly',
                                [
                                    {
                                        text:'Ok'
                                    }
                                ]
                            );
                        }else{
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {

        marginTop: 10,
        fontSize: 15,
        color: 'white',

    },
    textIn: {
        marginTop: 45,
        width: 270,
        height: 40,
        borderBottomWidth: 2,
        color: 'white',
        borderBottomColor: 'white'
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
    }, textButton: {
        color: '#F5F5DC',
    },
})

module.exports = RegisterUser;