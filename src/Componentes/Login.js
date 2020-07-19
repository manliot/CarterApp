//Imports Components
import React, { useState, useRef } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, TouchableHighlight, Alert, TextInput, ScrollView, Dimensions } from 'react-native'
import { Container, Content } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'

//ACTIONS --> Redux --> Global State
/*===========================================
 sera usado para actualizar el estado global 
 con el usuario que se logueo en la app 
==============================================*/
import { SetInfoUser } from '../actions/actions'

//styles
const styles = require("../Styles/LoginStyles")

const TemLogin = ({ route, navigation }) => {
  const [usuario, setusuario] = useState('')
  const [contraseña, setcontraseña] = useState('')
  const db = useSelector(state => state.db)
  let nombre = useSelector(state => state.nombre)
  const dispatch = useDispatch()
  const contraseña_ref = useRef(null)
  const onPressRegisterButton = () => {//navega hasta RegisterUser
    navigation.navigate('RegisterUser')
  }
  const onPressLoginButton = () => {//consulta en la base de datos con el estado del componente  
    //en caso logueo correcto, notifica, actualiza el estado global y navega hacia el home o ventaa principal
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Usuario WHERE Usuario = ? and Contraseña=?', [usuario, contraseña],
        (tx, res) => {
          const len = res.rows.length;//<-- 0 in case of no users register
          if (len == 1) {
            const row = res.rows;
            /** ===================
            down we update the global state with the result of the query (Nombre and  Usuario)
            to be used in Componente_Lista for get the information.
            ============================================================================*/
            dispatch(SetInfoUser(row.item(0).Nombre, row.item(0).Usuario))
            Alert.alert(
              `Bienvenido ${row.item(0).Nombre}!`,
              'Has ingresado satifactoriamente',
              [
                { text: 'Vamos!', onPress: () => navigation.navigate('Home') },
                { text: 'Cancelar' }
              ]
            )
          } else {
            if (len == 0) {
              Alert.alert(
                'Intenta de nuevo',
                'Usuario o Contraseña Incorrecta ',
                [
                  { text: 'Ok' }
                ]
              )
            }
          }
        })
    });
  }
  return (
    <ScrollView  >
      <Container >
        <View style={styles.container}>
          <Image style={styles.img_logo} source={require('../../assets/images/logo_Login.png')} />
          <View style={styles.box}>
            <Image style={styles.img_logoUser} source={require('../../assets/images/user.png')} />
            <Text style={styles.textForm}>Ingresa</Text>
            <TextInput style={styles.textInput} placeholderTextColor='grey' placeholder='Usuario'
              onChangeText={text => setusuario(text)}
              onSubmitEditing={(event) => { contraseña_ref.current.focus(); }} />
            <TextInput secureTextEntry={true} style={styles.textInput}
              placeholderTextColor='grey' placeholder='Contraseña'
              onChangeText={text => setcontraseña(text)} ref={contraseña_ref}
              onSubmitEditing={onPressLoginButton} />
            <TouchableHighlight onPress={onPressLoginButton} style={styles.button}>
              <Text style={{ color: 'white' }}> Log in </Text>
            </TouchableHighlight>
            <TouchableWithoutFeedback onPress={onPressRegisterButton} style={styles.buttonRegister}>
              <Text style={styles.textButton}>No estas Registrado? Click aqui</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Container>
    </ScrollView>
  )
}

export default TemLogin
