import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header } from 'native-base'
import { NavigationEvents } from 'react-navigation';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Cartera from './Cartera'

import Moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/es-CO'; // or any other locale you need

//redux
import { useDispatch, useSelector } from 'react-redux'
import { RefreshDeudasFalse, RefreshPrestamoFalse } from '../actions/actions'

import pixelConverter from '../utils/dimxPixels'

//sera usada para agrupar las box 
let Fecha
//
let funcion = ''
//formateo del monto formato estadounidense
const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
export default function Lista(props) {
  //state
  let [FlatListItems, setFlatListItems] = useState([])
  let [TempFlatListItems, setTempFlatListItems] = useState([])
  let [refreshing, setrefreshing] = useState(false)
  let [expandir, setExpandir] = useState(false)
  let [item, setItem] = useState('')
  let [textBuscar, setTextBuscar] = useState('')
  let [sort, setSort] = useState('ASC')
  let [campo, setCampo] = useState('Fecha')

  //globalState
  const db = useSelector(state => state.db)
  const usuario = useSelector(state => state.usuario)
  let refreshPrestamos = useSelector(state => state.refreshPrestamos)
  let refreshDeudas = useSelector(state => state.refreshDeudas)
  //dispach 
  const dispatch = useDispatch()
  //useEfect
  useEffect(() => {
    if (refreshing === true) {
      console.log('<<<<<<<<<<<<<<<<1')
      /* Fecha = ''
      setrefreshing(false)
      getLista() */

    }
  }, [refreshing])
  useEffect(() => {
    console.log('2')
    UpdateList()
  }, [campo])
  useEffect(() => {
    console.log('3')
    Fecha = ''
    getLista()
  }, [sort])
  /*  useEffect(() => {
     console.log('10')
     if (refreshing == true) {
       if (funcion != 'filtrar') {
         Fecha = ''
         getLista()
 
       }
     }
   }, [refreshing]) */
  useEffect(() => {
    console.log('4')
    if (refreshing == true) {
      if (refreshDeudas) {
        dispatch(RefreshDeudasFalse())
      } else if (refreshPrestamos) {
        dispatch(RefreshPrestamoFalse())
      }
    }
  }, [refreshDeudas, refreshPrestamos])
  useEffect(() => {
    filtrarAlBuscar()
  }, [textBuscar])
  //methods
  const getLista = () => {
    // se llena el flatlistItem con el resultado del query
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${props.TypeList} WHERE Usuario=? ORDER BY "${campo}" ${sort}`,
        [usuario],
        (tx, res) => {
          var temp = new Array();
          for (let i = 0; i < res.rows.length; ++i) {
            let item = res.rows.item(i)
            const Id = ''
            if (props.TypeList == 'DebenList') {
              Id = item.IDdeben
            } else if (props.TypeList == 'DeboList') {
              Id = item.IDdebo
            } else console.error('Faltan datos para poder llenar el componente')
            temp[i] = { ...item, Id }
          }
          setFlatListItems(temp); setTempFlatListItems(temp); setrefreshing(false)
        }, errorDB)
    })
  };
  const errorDB = (error) => {
    console.error(error)
  }
  const filtrarAlBuscar = () => {
    funcion = 'filtrar'
    setrefreshing(true)
    if (textBuscar === '') {
      setTempFlatListItems(FlatListItems); setrefreshing(false)
    } else {
      const filtro = textBuscar;
      let newTempArray = FlatListItems.filter(i => i.Nombre.includes(filtro))
      setTempFlatListItems(newTempArray); setrefreshing(false)
    }
  }
  const orderBy = (num) => {
    switch (num) {
      case 0:
        setCampo('Fecha')
        break
      case 1:
        setCampo('Nombre')
        break
      case 2:
        setCampo('Monto')
        break
      default:
        setCampo('Fecha')
        break
    }
  }
  const sortFunction = () => {
    if (sort === 'ASC') {
      setSort('DESC')
      setrefreshing(true)
    } else if ((sort === 'DESC')) {
      setSort('ASC')
      setrefreshing(true)
    } else {
      console.error(new Error('ASC/DESC'))
    }
  }
  const disableTextMenuItem = (itemText) => {
    if (itemText == campo) true
    return true
  }
  const ImagePage = () => {
    //      <Image style={{ height: 600, width: 370 }} source={require('../../assets/images/bienvenidoPage.png')}></Image>
    return (
      <Image style={{ height: 600, width: 370 }} source={require('../../assets/images/sorryPage.png')} />
    )
  }
  const openDrawer = () => {
    props.navigation.openDrawer()
  }
  renderItemComponent = (itemObject) => {
    const { item } = itemObject
    let igualFecha = true
    if (item.Fecha != Fecha) {
      igualFecha = false
      Fecha = item.Fecha
    }
    return (//View de los items del FlatList
      <View style={styles.container_lista} >
        {!igualFecha && (
          <Text style={styles.fecha}>• • {Moment(new Date(item.Fecha)).format("DD MMM [de] YYYY")} • •</Text>
        )}
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => { GoDetails(item) }} >
          <View style={styles.lista} >
            <View style={styles.top} >
              <Text style={styles.tex2} > {props.quien}</Text>
              <Text style={styles.tex3}>{formatter.format(item.Monto)} </Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.tex}> {item.Nombre} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  };
  const UpdateList = (num) => {
    funcion = 'update'
    setrefreshing(true)
  }
  const GoDetails = (item) => {
    setItem('')
    props.navigation.navigate('Detalles', { item: item, TypeList: props.TypeList })
  }
  return (
    <Container>
      <Header style={styles.header}>
        <View style={{ width: Dimensions.get('window').width - 63, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.search}>
            <Image style={{ height: pixelConverter(40), width: pixelConverter(40), left: pixelConverter(25) }}
              source={require('../../assets/images/search.png')} />
            <TextInput style={{ position: 'relative', color: '#F0F0F0', left: -pixelConverter(30), height: pixelConverter(70), width: pixelConverter(450), paddingBottom: pixelConverter(17), paddingStart: pixelConverter(65), fontSize: pixelConverter(30) }}
              placeholderTextColor='#F0F0F0' placeholder='Buscar' onChangeText={text => setTextBuscar(text)} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => { orderBy }}
          style={{ position: 'absolute', top: pixelConverter(30), left: pixelConverter(10) }}>
          <Menu>
            <MenuTrigger text='' >
              <Image source={require('../../assets/images/more.png')}
                style={{ height: pixelConverter(50), width: pixelConverter(50), }} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => orderBy(0)} text='Ordenar Por Fecha' />
              <MenuOption onSelect={() => orderBy(1)} text='Ordenar Por Nombre' />
              <MenuOption onSelect={() => orderBy(2)} text='Ordenar Por Valor' />
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={sortFunction}
          style={{ marginRight: pixelConverter(20), position: 'absolute', top: pixelConverter(30), left: pixelConverter(60) }}>
          <Image source={require('../../assets/images/sort.png')}
            style={{ height: pixelConverter(50), width: pixelConverter(50), }}
          /></TouchableOpacity>
        <Image onPress={() => { props.navigation.openDrawer() }} style={{ borderRadius: pixelConverter(100), height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/userlista.png')} />
      </Header>
      <FlatList
        ListHeaderComponent={
          <View>
            <NavigationEvents
              onWillFocus={payload => {
                console.log(refreshPrestamos, refreshDeudas)
                if (props.TypeList === 'DebenList' || props.TypeList === 'DeboList') {
                  setrefreshing(true)
                }
              }}
            />
          </View>
        }
        style={{ backgroundColor: '#B2E9AB' }}
        keyExtractor={item => `i${item.Id}`} refreshing={refreshing}
        onRefresh={UpdateList} data={TempFlatListItems}
        renderItem={renderItemComponent}
        ListEmptyComponent={ImagePage}
      />
      <TouchableOpacity onPress={openDrawer} style={{ elevation: 10, width: '100%', borderRadius: pixelConverter(100), height: pixelConverter(120), width: pixelConverter(120), marginTop: pixelConverter(-132), position: 'absolute', right: pixelConverter(30), bottom: pixelConverter(25) }} >
        <Image style={{ height: pixelConverter(120), width: pixelConverter(120) }} source={require('../../assets/images/plus.png')} />
      </TouchableOpacity>
    </Container >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  header: {
    backgroundColor: '#B2E9AB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: pixelConverter(14),
    width: pixelConverter(470),// si se cambia entonces cambiar en el gettConceptoview
    backgroundColor: '#a7a9a3',
    height: pixelConverter(70),
    borderRadius: pixelConverter(10),
  },
  fecha: {
    marginTop: pixelConverter(50),
    marginBottom: pixelConverter(10),
    color: '#959595',
    fontSize: pixelConverter(28),
  },
  touchableOpacity: {
    padding: pixelConverter(0),
    borderRadius: pixelConverter(10),
  },
  lista: {
    marginTop: pixelConverter(27),
    backgroundColor: '#ecfcff',
    paddingTop: pixelConverter(25),
    paddingBottom: pixelConverter(20),
    paddingEnd: pixelConverter(18),
    paddingStart: pixelConverter(27),
    width: Dimensions.get('window').width - 65,// si se cambia entonces cambiar en el gettConceptoview
    height: pixelConverter(120),
    borderRadius: pixelConverter(10),
    elevation: 5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  bottom: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  container_lista: {
    alignItems: 'center'
  },
  tex: {
    fontSize: pixelConverter(31),
    color: '#65D359',
    fontFamily: 'Roboto-Bold'
  },
  tex2: {
    color: '#6F6C6C',
    fontSize: pixelConverter(27),
  },
  tex3: {
    fontSize: 16,
    alignItems: 'flex-end',
    fontFamily: 'Roboto-Bold',
    flex: 1,
    textAlign: 'right'
  },
})
