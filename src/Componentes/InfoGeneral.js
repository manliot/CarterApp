import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button, Navigator, TouchableHighlight } from 'react-native'

let deben = 10000;
let debes = 2000;
let cartera = 3000;

class PrincipalView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tex}>  Te deben: ${deben} (COP)</Text>
        <Text style={styles.tex}> Debes: ${debes} (COP)</Text>
        <Text style={styles.tex}> Cartera: ${cartera} (COP)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.30,
    //backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  tex: {
    fontSize: 18
  },
 })

export default PrincipalView
