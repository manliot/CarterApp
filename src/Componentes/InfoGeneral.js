import React, { Component, memo } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Image, ImageBackground } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase
import { Header } from 'native-base'
//opening database
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
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
let heightApropiada = height / 3.8;
class Componente_Lista extends Component {
  constructor() {
    super()
    this.state = {
      usuario: '',
      TotalDeben: 0,
      TotalDebes: 0,
      TotalCartera: 0,
    }
  }
  getInfo() {
    console.log('obteniendo info...')
    //llenando la info general en base a la base de datos
    this.getTotalMonto('SELECT Monto FROM DebenList WHERE Usuario=?', 'deben');
    this.getTotalMonto('SELECT Monto FROM DeboList WHERE Usuario=?', 'debes');
  }
  componentDidMount() {
    this.getInfo()
    const max = Math.max(this.state.TotalDeben.length, this.state.TotalDebes.length, this.state.TotalCartera.length)
    heightApropiada = parseFloat(max / 6) * parseFloat(height / 3.8)
  }
  getTotalMonto = (querytxt, type) => {
    const { params } = this.props.nav;
    this.setState({ usuario: params.usuario })
    db.transaction(tx => {
      tx.executeSql(querytxt, [this.state.usuario],
        (tx, res) => {
          var totalTem = 0;
          for (let i = 0; i < res.rows.length; ++i) {
            let item = res.rows.item(i)
            totalTem = totalTem + item.Monto;//<<-- to infoGeneral
          }
          if (type == 'deben') {
            this.setState({ TotalDeben: totalTem })
          } else {
            this.setState({ TotalDebes: totalTem })
          }
        })
    })
  };

  render() {
    const { params } = this.props.nav;
    return (
      <View style={{ flex: 1, height: (height / 2.5), backgroundColor: '#6281ff', justifyContent: 'center', alignItems: 'center' }}>

        <View style={styles.circuloView}>
          <View style={styles.TotalView}>
            <Text style={styles.tex} ref='t1' >  Te deben: ${this.state.TotalDeben} </Text>
            <Text style={styles.tex}> Debes: ${this.state.TotalDebes} </Text>
            <Text style={styles.tex}> Cartera: ${this.state.TotalCartera}  </Text>
          </View>
        </View>
        <View style={styles.BienvenidoView}>
          <Image source={{ uri: 'https://yt3.ggpht.com/a/AGF-l7_G980npHDLK-MsvflU7J8aluAWBb0_S13C8Q=s900-c-k-c0xffffffff-no-rj-mo' }}
            style={{ height: 60, width: 60, borderRadius: 60, }} />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.texb}> Bienvenido {params.Nombre} !</Text>
            <Text style={styles.texu}> Su ultimo ingreso fue: 4/1/2020 </Text>
          </View>


        </View>


      </View>

    )
  }
  getHeight() {

  }
}



const styles = StyleSheet.create({
  TotalView: {
    alignItems: 'center',
  },
  BienvenidoView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tex: {
    fontSize: 18,
    color: 'white',
    //backgroundColor: 'yellow'
  },
  texb: {
    fontSize: 14,
    color: 'white'
  },
  texu: {
    fontSize: 14,
    color: '#cccccc'
  },
  circuloView: {
    marginTop: 10,
    backgroundColor: '#5173FF',
    borderWidth: 3,
    borderRadius: 100,
    borderColor: '#ffe061',
    height:height / 3.9,
    justifyContent: 'center', alignItems: 'center'
  }
})

export default React.memo(Componente_Lista)

