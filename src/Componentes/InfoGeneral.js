import React, { Component, memo } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'


import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
})
const height = Dimensions.get('window').height
class Componente_Lista extends Component {
  render() {
    return (
      <View style={{ flex: 1, height: (height / 2.5), backgroundColor: '#6281ff', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.circuloView} ref='circulo'>
          <View style={styles.TotalView}>
            <Text style={styles.tex} >  Te deben: {formatter.format(this.props.TotalDeben)} </Text>
            <Text style={styles.tex}> Debes: {formatter.format(this.props.TotalDebes)} </Text>
            <Text style={styles.tex}> Cartera: {formatter.format(this.props.TotalCartera)}  </Text>
          </View>
        </View>
        <View style={styles.BienvenidoView}>
          <Image source={{ uri: 'https://yt3.ggpht.com/a/AGF-l7_G980npHDLK-MsvflU7J8aluAWBb0_S13C8Q=s900-c-k-c0xffffffff-no-rj-mo' }}
            style={{ height: 60, width: 60, borderRadius: 60, }} />
          <TouchableWithoutFeedback>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.texb}> Bienvenido {this.props.nombre} !</Text>
              <Text style={styles.texu}> Su ultimo ingreso fue: {this.props.ultimaVez} </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
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
    height: height / 3.9,
    justifyContent: 'center', alignItems: 'center'
  }
})
const mapStateToProps = (state) => {
  return {
    db: state.db,
    nombre: state.nombre,
    usuario: state.usuario,
    TotalDeben: state.debenT,
    TotalDebes: state.debesT,
    TotalCartera: state.cartera,
    ultimaVez: state.ultimaVez
  }
}
export default connect(mapStateToProps)(React.memo(Componente_Lista))

