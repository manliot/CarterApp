import React, { useState, useRef, memo, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Dimensions, TouchableHighlight, Alert, Image, TouchableOpacity } from 'react-native';
import { Body, Container, View, } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { RefreshDeudasTrue, RefreshTrue, RefreshPrestamoTrue, UpdateDEBEN, UpdateDEBES, } from '../actions/actions'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import actualizar from '../utils/actualizar'
import pixelConverter from '../utils/dimxPixels'

import { set } from 'react-native-reanimated';
const w = (Dimensions.get('window').width)
const h = (Dimensions.get('window').height)

Prestamo_Deuda = (props, { route, navigation }) => {
  //state
  const [Monto, setMonto] = useState('')
  const [Nombre, setNombre] = useState('')
  const [concepto, setConcepto] = useState('')
  let [date, setDate] = useState('')
  let [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(false)
    return () => {
      setIsVisible(false)
    }
  }, [isVisible])
  //refs
  const monto_ref = useRef(null)
  const Concepto_ref = useRef(null)
  //globalState
  const db = useSelector(state => state.db)
  const usuario = useSelector(state => state.usuario)
  //dispach
  const dispatch = useDispatch()
  //methods
  const showDatePicker = () => {
    console.log('viendo')
    setIsVisible(true)
  }
  const hideDatePicker = () => {
    console.log('--')
    setIsVisible(false)
  }
  const handleConfirm = (date) => {
    const dia = date.getDate(); //Current Date
    const month = date.getMonth() + 1; //Current Month
    const year = date.getFullYear(); //Current Year
    const fecha = `${year}/${month}/${dia}`
    setDate(fecha)
    hideDatePicker()
    console.log('-------')
  }
  const onClickAddButon = () => {
    if (date == '') {
      const date = new Date().getDate(); //Current Date
      const month = new Date().getMonth() + 1; //Current Month
      const year = new Date().getFullYear(); //Current Year
      setDate(`${month}/${date}/${year}`)
    }
    if (Monto === '' || Nombre === '') {
      alert('Debe llenar los campos obligatorios (*)');
    } else {
      if (Monto == '' || isNaN(Monto)) {
        alert('El campo "Monto" no debe estar vacio y ser un valor numerico');
      } else {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO ${props.TypeList} (Monto,Nombre,Concepto,Fecha,Usuario) VALUES(?,?,?,?,?)`,
            [Monto, Nombre, concepto, date, usuario],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'You are Registered Successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {
                        actualizar(`SELECT Monto FROM ${props.TypeList} WHERE Usuario =?`, usuario, db)
                          .then((res) => {
                            if (props.TypeList === 'DeboList') {
                              dispatch(RefreshDeudasTrue())
                              dispatch(UpdateDEBES(res))
                            } else {
                              dispatch(RefreshPrestamoTrue())
                              dispatch(UpdateDEBEN(res))
                            }
                            dispatch(RefreshTrue())
                            props.navigation.navigate('Home')
                          })
                          .catch((err) => {
                            console.error(new Error(err))
                          })
                      },
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
  return (
    <View style={{ backgroundColor: '#B2E9AB', flex: 1 }}>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <ScrollView >
        <View style={styles.containerScroll}>
          <View style={styles.form}>
            <Text style={styles.title}>{props.scrn}</Text>
            <TextInput style={[styles.textInput, { marginTop: 0 }]} autoFocus={false} placeholderTextColor='grey' placeholder={props.Txt + "*"} onChangeText={text => setNombre(text)} onSubmitEditing={event => monto_ref.current.focus()} />
            <TextInput style={styles.textInput} keyboardType='numeric' placeholderTextColor='grey' placeholder={props.Monto + "*"} onChangeText={text => setMonto(text)} ref={monto_ref} />
            <View style={styles.dateSelector} >
              <TouchableHighlight onPress={showDatePicker} style={{ borderRadius: pixelConverter(10) }}>
                <TextInput editable={false} style={[styles.textInput, { marginTop: 0, color: 'grey' }]} keyboardType='numeric' placeholderTextColor='grey' placeholder={"¿Que dia?"} onChangeText={text => setDate(text)} onSubmitEditing={event => Concepto_ref.current.focus()} >{date}</TextInput>
              </TouchableHighlight>
              <TouchableOpacity onPress={showDatePicker} style={{ right: pixelConverter(60) }}>
                <Image style={{ height: pixelConverter(50), width: pixelConverter(50) }} source={require('../../assets/images/calendar.png')} />
              </TouchableOpacity>
            </View>
            <TextInput style={[styles.textInput, { height: pixelConverter(116) }]} words={true} multiline={true} placeholderTextColor='grey' placeholder={props.Concepto} onChangeText={text => setConcepto(text)} ref={Concepto_ref} />
            <TouchableHighlight onPress={onClickAddButon} style={styles.button}>
              <Text style={styles.textButton}>Listo!</Text>
            </TouchableHighlight>
          </View>
          <TouchableOpacity style={{ elevation: 10, width: '100%', borderRadius: pixelConverter(100), height: pixelConverter(110), width: pixelConverter(110), right: -pixelConverter(290), marginTop: -pixelConverter(100) }} >
            <Image style={{ height: pixelConverter(110), width: pixelConverter(110) }} source={require('../../assets/images/plus.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Image style={{ borderRadius: pixelConverter(100), height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/userlista.png')} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {

  },
  containerScroll: {
    backgroundColor: '#B2E9AB',
    flex: 1,
    alignItems: 'center',
    height: h
  },
  form: {
    marginTop: pixelConverter(110),
    backgroundColor: 'white',
    width: pixelConverter(620),
    alignItems: 'center',
    borderRadius: pixelConverter(32),
    elevation: 5,
    paddingBottom: pixelConverter(126),
    paddingTop: pixelConverter(60),
    paddingEnd: pixelConverter(67),
    paddingStart: pixelConverter(67)
  },
  title: {
    marginTop: 13,
    fontSize: 20,
    color: '#947777',
    marginBottom: pixelConverter(90)
  },
  dateSelector: {
    flexDirection: 'row',
    height: pixelConverter(75),
    marginTop: pixelConverter(58),
    alignItems: 'center',
    width: pixelConverter(484),
  },
  header: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 0,
    width: Dimensions.get('window').width,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  button: {
    width: pixelConverter(240),
    height: 40,
    backgroundColor: '#65D359',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelConverter(58),
    marginBottom: 10,
    borderRadius: 20,
  },
  textButton: {
    color: '#FFFDFD',
  },
  textIn: {
    marginTop: 45,
    width: 270,
    height: 40,
    borderBottomWidth: 2,
    color: 'black',
    borderBottomColor: 'grey'
  },
  textInput: {
    marginTop: pixelConverter(58),
    width: pixelConverter(484),
    height: pixelConverter(75),
    color: 'black',
    backgroundColor: '#F2F2F2',
    borderRadius: pixelConverter(10),
    paddingStart: pixelConverter(20)
  },
  textInConcepto: {
    marginTop: 45,
    width: 270,
    height: 100,
    borderBottomWidth: 2,
    color: 'black',
    borderBottomColor: 'grey'
  },
})
export default memo(Prestamo_Deuda)