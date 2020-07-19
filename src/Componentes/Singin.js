import React, { useState, useRef } from 'react';
import { Text, Alert, View, TextInput, ScrollView, TouchableHighlight, Image } from 'react-native';
import { useSelector } from 'react-redux'
import { Toast, Container } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
//styles
const stylesRegister = require('../Styles/RegisterStyles');
const stylesLogin = require('../Styles/LoginStyles');

export default function Singin({ route, navigation }) {
  const [Name, setName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Age, setAge] = useState('')
  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  //refs
  const name_ref = useRef(null)
  const lastname_ref = useRef(null)
  const edad_ref = useRef(null)
  const username_ref = useRef(null)
  const password_ref = useRef(null)
  //globalState

  //Dispach
  const db = useSelector(state => state.db)
  const db2 = useSelector(state => state.db2)
  //methods
  const vaciarFormulario = () => {// vacia el formulario
    name_ref.value = ''
    lastname_ref.value = ''
    edad_ref.value = ''
    username_ref.value = ''
    password_ref.value = ''
  }
 /*  const onPressRegisterButton = () => {//realiza un query a la base de datos para añadir un nuevo usuario.
    if (Name == '' || LastName == '' || Age == '' || UserName == '' || Password == '') {
      Toast.show(
        {
          text: 'Por favor, Complete toda la informacion',
          buttonText: 'Ok', position: 'bottom',
          type: "warning", onClose: () => { console.log('') },
          duration: 30000,
        }
      )
    } else {
      if (!isNaN(Age)) {
        vaciarFormulario()
        db2.collection("Usuario").add({
          Usuario: UserName,
          Contraseña: Password,
          Nombre: Name,
          Apellido: LastName,
          Edad: parseInt(Age)
        })
          .then((mes) => {
            Toast.show(
              {
                text: 'Fuiste registrado satifactoriamente en cloud',
                buttonText: 'Ok', position: 'bottom',
                type: "success", onClose: () => { navigation.goBack() },
                duration: 30000,
              }
            )
            console.log(mes)
          })
          .catch((err) => console.error(new Error(err)))
        /*         db.transaction(tx => {
                  tx.executeSql(
                    'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
                    [UserName, Password, Name, LastName, Age],
                    (tx, res) => {
                      if (res.rowsAffected > 0) {
                        Toast.show(
                          {
                            text: 'Fuiste registrado satifactoriamente',
                            buttonText: 'Ok', position: 'bottom',
                            type: "success", onClose: () => { navigation.goBack() },
                            duration: 30000,
                          }
                        )
                      } else {
                        Toast.show(
                          {
                            text: 'Error al registrarse, Vuela a intentar',
                            buttonText: 'Okay', position: 'bottom',
                            type: "danger", onClose: () => { console.log('') }
                          }
                        )
                        alert('fallo al registrarse');
                      }
                    }
                  )
                }, () => {
                  username_ref.value = ''
                  Toast.show(
                    {
                      text: 'Este nombre de usuario ya fue escogido :c',
                      buttonText: 'Okay', position: 'bottom',
                      type: "danger", onClose: () => { console.log('pero que ha pasao') }
                    }
                  )
                }); 
      } else {
        Alert.alert('', 'La edad tiene que ser un valor numerico')
      }
    }
  } */
  const onPressRegisterButton = () => {//realiza un query a la base de datos para añadir un nuevo usuario.
    if (Name == '' || LastName == '' || Age == '' || UserName == '' || Password == '') {
      Toast.show(
        {
          text: 'Por favor, Complete toda la informacion',
          buttonText: 'Ok', position: 'bottom',
          type: "warning", onClose: () => { console.log('') },
          duration: 30000,
        }
      )
    } else {
      if (!isNaN(Age)) {
        vaciarFormulario()
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
            [UserName, Password, Name, LastName, Age],
            (tx, res) => {
              if (res.rowsAffected > 0) {
                Toast.show(
                  {
                    text: 'Fuiste registrado satifactoriamente',
                    buttonText: 'Ok', position: 'bottom',
                    type: "success", onClose: () => { navigation.goBack() },
                    duration: 30000,
                  }
                )
              } else {
                Toast.show(
                  {
                    text: 'Error al registrarse, Vuela a intentar',
                    buttonText: 'Okay', position: 'bottom',
                    type: "danger", onClose: () => { console.log('') }
                  }
                )
                alert('fallo al registrarse');
              }
            }
          )
        }, () => {
          username_ref.value = ''
          Toast.show(
            {
              text: 'Este nombre de usuario ya fue escogido :c',
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
  return (
    <View style={stylesRegister.container} >
      <Image style={[stylesLogin.fondo, { position: 'absolute', top: 0, width: '100%' }]} imageStyle={{ resizeMode: 'center', height: '25%', width: '100%' }} source={require('../../assets/images/FONDO.png')} />
      <ScrollView style={[{ width: '100%' }]}>
        <Container style={{ backgroundColor: 'transparent', justifyContent: "center" }}>
          <View style={[stylesLogin.box, { marginTop: 0 }]}>
            <Image style={{ height: 80, width: 80, position: 'relative', top: -70, borderRadius: 50 }} source={require('../../assets/images/userReg.png')} />
            <TouchableHighlight activeOpacity={1} underlayColor='#ecfcff' style={{ width: 40, alignItems: 'center', position: 'relative', top: -108, left: '44%' }} onPress={() => navigation.goBack()}>
              <Feather name='x-circle' size={25} />
            </TouchableHighlight>
            <Text style={stylesRegister.subTitle}> Por favor, completa todos los campos. </Text>
            <TextInput style={[stylesLogin.textInput, { marginTop: -65 }]} autoFocus={false} placeholderTextColor='grey' placeholder='Nombre*' onChangeText={text => setName(text)} onSubmitEditing={event => lastname_ref.current.focus()} ref={name_ref} />
            <TextInput style={stylesLogin.textInput} placeholderTextColor='grey' placeholder='Apellido*' onChangeText={text => setLastName(text)} onSubmitEditing={event => edad_ref.current.focus()} ref={lastname_ref} />
            <TextInput style={stylesLogin.textInput} placeholderTextColor='grey' keyboardType='numeric' placeholder='Edad*' onChangeText={text => setAge(text)} onSubmitEditing={event => username_ref.current.focus()} ref={edad_ref} />
            <TextInput style={stylesLogin.textInput} placeholderTextColor='grey' placeholder='Usuario*' onChangeText={text => setUserName(text)} onSubmitEditing={event => password_ref.current.focus()} ref={username_ref} />
            <TextInput style={stylesLogin.textInput} secureTextEntry={true} placeholderTextColor='grey' placeholder='Contraseña*' onChangeText={text => setPassword(text)} ref={password_ref} />
            <TouchableHighlight style={stylesLogin.button} onPress={onPressRegisterButton}>
              <Text style={{ color: 'white' }}>Registrarse</Text>
            </TouchableHighlight>
          </View>
        </Container>
      </ScrollView>
    </View >
  )
}

/* const onPressRegisterButton = () => {//realiza un query a la base de datos para añadir un nuevo usuario.
  if (Name == '' || LastName == '' || Age == '' || UserName == '' || Password == '') {
    Toast.show(
      {
        text: 'Por favor, Complete toda la informacion',
        buttonText: 'Ok', position: 'bottom',
        type: "warning", onClose: () => { console.log('') },
        duration: 30000,
      }
    )
  } else {
    if (!isNaN(Age)) {
      vaciarFormulario()
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Usuario (Usuario, Contraseña, Nombre, Apellido, Edad) VALUES (?,?,?,?,?)',
          [UserName, Password, Name, LastName, Age],
          (tx, res) => {
            if (res.rowsAffected > 0) {
              Toast.show(
                {
                  text: 'Fuiste registrado satifactoriamente',
                  buttonText: 'Ok', position: 'bottom',
                  type: "success", onClose: () => { navigation.goBack() },
                  duration: 30000,
                }
              )
            } else {
              Toast.show(
                {
                  text: 'Error al registrarse, Vuela a intentar',
                  buttonText: 'Okay', position: 'bottom',
                  type: "danger", onClose: () => { console.log('') }
                }
              )
              alert('fallo al registrarse');
            }
          }
        )
      }, () => {
        username_ref.value = ''
        Toast.show(
          {
            text: 'Este nombre de usuario ya fue escogido :c',
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
 */