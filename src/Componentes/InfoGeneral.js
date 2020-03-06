import React, { Component, memo } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Image } from 'react-native'
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
      <View style={{ backgroundColor: '#6281ff', justifyContent: 'center' }}>
        <View style={styles.BienvenidoView}>
          <Image source={{ uri: 'https://yt3.ggpht.com/a/AGF-l7_G980npHDLK-MsvflU7J8aluAWBb0_S13C8Q=s900-c-k-c0xffffffff-no-rj-mo' }}
            style={{ height: 65, width: 65, borderRadius: 60, }} />
          <View>
            <Text style={styles.texb}> Bienvenido {params.Nombre} !</Text>
            <Text style={styles.texu}> Su ultimo ingreso fue: 4/1/2020</Text>
          </View>

        </View>
        <View style={styles.container}>
          <Text style={styles.tex}>  Te deben: ${this.state.TotalDeben} </Text>
          <Text style={styles.tex}> Debes: ${this.state.TotalDebes} </Text>
          <Text style={styles.tex}> Cartera: ${this.state.TotalCartera} </Text>
        </View>
      </View>

    )
  }
}
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: (height / 5),
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30
  },
  BienvenidoView: {
    flexDirection: 'row',
    flex: 0.5,
    marginLeft: 30,
    marginTop: 30,
  },
  tex: {
    fontSize: 18,
    color: 'white'
  },
  texb: {
    fontSize: 14,
    color: 'white'
  },
  texu: {
    fontSize: 14,
    color: '#cccccc'
  },
})

export default React.memo(Componente_Lista)

