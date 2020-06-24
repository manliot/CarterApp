import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Alert, FlatList, Image } from 'react-native'
import { Container, Header } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { RefreshDeudasTrue, RefreshPrestamoTrue, RefreshTrue, UpdateDEBEN, UpdateDEBES } from '../actions/actions'

import actualizar from '../utils/actualizar'

import 'intl/locale-data/jsonp/en'; // or any other locale you need
import 'intl';
const formatter = new Intl.NumberFormat('es-CO', {
  style: "currency", currency: "COP"
})
export default function masDetalles(props) {
  //params
  const TypeList = props.navigation.state.params.TypeList
  //globalState
  const db = useSelector(state => state.db)
  const usuario = useSelector(state => state.usuario)
  //dispach
  const dispatch = useDispatch()
  //item
  const item = props.navigation.state.params.item
  //methods
  const alertaBorrar = () => {
    Alert.alert(
      'Advertencia!', 'Una vez borrado el item no podra ser recuperado ¿seguro que desea borrarlo?',
      [
        { text: 'Si!', onPress: DeleteItem },
        { text: 'Cancelar' }
      ],
    )
  }
  const alertaAbonar = () => {
    Alert.alert(
      'Proximamente..',
      'Actualmente nos econtramos trabajando en esta caracteristica, Disculpe las molestias <3',
      [
        { text: 'Ok', }
      ]
    )
  }
  const DeleteItem = () => {// puede ir en un archivo separado
    let query = ''
    if (TypeList == 'DeboList') {
      query = 'DELETE FROM  DeboList where IDdebo=?'
    } else if (TypeList == 'DebenList') {
      query = 'DELETE FROM  DebenList where IDdeben=?'
    }
    db.transaction(tx => {
      tx.executeSql(query, [item.Id], (tx, res) => {
        if (res.rowsAffected > 0) {
          actualizar(`SELECT Monto FROM ${TypeList} WHERE Usuario =?`, usuario, db)
            .then((res) => {
              if (TypeList === 'DeboList') {
                dispatch(RefreshDeudasTrue())
                dispatch(UpdateDEBES(res))
              } else {
                dispatch(RefreshPrestamoTrue())
                dispatch(UpdateDEBEN(res))
              }
              dispatch(RefreshTrue())
              //goBack
              props.navigation.pop()
              Alert.alert(
                'Borrado exitoso',
                'Se ha borado el item satifactoriamente',
                [
                  { text: 'Ok' }
                ]
              )
            })
            .catch((err) => {
              console.error(new Error(err))
            })

        } else {
          Alert.alert(
            'Error #100:',
            'Ya ha borrado este item, vuelva al Inicio, comuniquese con nosotros',
            [
              { text: 'Ok' }
            ]
          )
          console.log(`error #100: no se ha borrado ningun elemento de la tabla ${item.Id}`)
        }
      })
    })
  }
  return (
    <Container>
      <Header style={{ backgroundColor: '#B2E9AB' }}>
      </Header>
      <FlatList
        style={{ backgroundColor: '#B2E9AB' }}
        ListHeaderComponentStyle={{ alignItems: 'center' }}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.titulo}>Detalles {TypeList ? (TypeList === 'DeboList') ? 'de la deuda' : (TypeList === 'DebenList') ? 'del prestamo' : '' : ''}</Text>
            <View style={styles.transacion}>
              <Text style={styles.tex1} >Le {TypeList ? (TypeList==='DeboList')?'debes':(TypeList==='DebenList')?'prestaste' :'': ''} a</Text>
              <Text style={styles.tex2}>{item.Nombre}</Text>
              <Text style={styles.tex1}>¿Cuanto?</Text>
              <Text style={styles.tex2}>{formatter.format(item.Monto)}</Text>
              <Text style={styles.tex1}>Para </Text>
              <Text style={styles.tex2}>{item.Concepto} </Text>
              <Text style={styles.tex1}>Fecha </Text>
              <Text style={styles.tex2}>{item.Fecha}</Text>
              <Text style={styles.tex1}>Referencia</Text>
              <Text style={styles.tex2}> {item.Id}</Text>
            </View>
            <View style={styles.icons}>
              <TouchableWithoutFeedback  onPress={alertaBorrar}>
                <Image style={{ height: 30, width: 30 }} source={require('../../assets/images/delete.png')} />
              </TouchableWithoutFeedback>
              <Text style={styles.texabonar}>Borrar</Text>
              <TouchableWithoutFeedback onPress={alertaAbonar} >
                <Image style={{ height: 30, width: 30 }} source={require('../../assets/images/abonar.png')} />
              </TouchableWithoutFeedback>
              <Text style={styles.texabonar}>abonar</Text>
            </View>
          </View>
        }
      />
    </Container>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 20,
    paddingVertical: 30
  },
  transacion: {
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    color: '#7D6565',
    fontFamily: 'Roboto-Regular'
  },
  tex1: {
    color: '#6F6C6C',
    fontSize: 13,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10,

  },
  tex2: {
    fontSize: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    color: '#B2E9AB',
    fontFamily: 'Roboto-Bold',
    marginTop: 2
  },
  texabonar: {
    marginTop: 0,
    fontSize: 11,
    color: 'black'
  },
  icons: {
    marginTop: -90,
    marginRight: 7,
    justifyContent: 'center',
    alignItems: "flex-end",
  }
})