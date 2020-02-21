import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button, Navigator, TouchableHighlight } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase

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

class PrincipalView extends Component {
  constructor() {
    super()
    this.state = {
      usuario: '',
      TotalDeben: 0,
      TotalDebes: 0,
      TotalCartera: 0,
    }

  }
  componentDidMount() {
    //llenando la info general en base a la base de datos
    this.getTotalMonto('SELECT Monto FROM DebenList WHERE Usuario=?', 'deben');
    this.getTotalMonto('SELECT Monto FROM DeboList WHERE Usuario=?', 'debes');
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
    return (
      <View style={styles.container}>
        <Text style={styles.tex}>  Te deben: ${this.state.TotalDeben} (COP)</Text>
        <Text style={styles.tex}> Debes: ${this.state.TotalDebes} (COP)</Text>
        <Text style={styles.tex}> Cartera: ${this.state.TotalCartera} (COP)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#6470dc'
  },
  tex: {
    fontSize: 18,
    color: 'white'
  },
  tex2: {
    fontSize: 14,
    color: 'white'
  },
})

export default PrincipalView
