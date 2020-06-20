import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Dimensions, TouchableHighlight, Alert, Image, TouchableOpacity } from 'react-native';
import { Body, Container, View, } from 'native-base'
import { connect } from 'react-redux'
import { RefreshDeudasTrue, RefreshPrestamoTrue, RefreshTrue } from '../actions/actions'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import actualizar from '../utils/actualizar'
import pixelConverter from '../utils/dimxPixels'

import { UpdateDEBEN, UpdateDEBES } from '../actions/actions'
const w = (Dimensions.get('window').width)
const h = (Dimensions.get('window').height)

class AddNewPrestamo extends Component {
  constructor() {
    super()
    this.state = {
      Monto: '',
      Nombre: '',
      concepto: '',
      date: '',
      isVisible: false
    }
  }
  showDatePicker() {
    this.setState({ isVisible: true })
  }
  hideDatePicker = () => {
    this.setState({ isVisible: false })
  }
  handleConfirm = (date) => {
    const dia = date.getDate(); //Current Date
    const month = date.getMonth() + 1; //Current Month
    const year = date.getFullYear(); //Current Year
    const fecha = `${year}/${month}/${dia}`
    this.setState({ date: fecha })

    console.log('fecha: ', fecha)
    this.hideDatePicker()
  }
  render() {
    return (
      <View style={{ backgroundColor: '#B2E9AB', flex: 1 }}>
        <DateTimePickerModal
          isVisible={this.state.isVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
        <ScrollView >
          <View style={styles.containerScroll}>
            <View style={styles.form}>
              <Text style={styles.title}>{this.props.scrn}</Text>
              <TextInput style={[styles.textInput, { marginTop: 0 }]} autoFocus={true} placeholderTextColor='grey' placeholder={this.props.Txt + "*"} onChangeText={(text) => this.setState({ Nombre: text })} onSubmitEditing={(event) => { this.refs._2.focus(); }} />
              <TextInput style={styles.textInput} keyboardType='numeric' placeholderTextColor='grey' placeholder={this.props.Monto + "*"} onChangeText={(text) => this.setState({ Monto: text })} ref='_2' />
              <View style={styles.dateSelector} >
                <TextInput editable={false} onPress={this.showDatePicker.bind(this)} style={[styles.textInput, { marginTop: 0, color: 'grey' }]} keyboardType='numeric' placeholderTextColor='grey' placeholder={"¿Que dia le prestaste?"} onChangeText={(text) => this.setState({ Monto: text })} onSubmitEditing={(event) => { this.refs._3.focus(); }} >{this.state.date}</TextInput>
                <TouchableHighlight onPress={this.showDatePicker.bind(this)} style={{ right: pixelConverter(60) }}>
                  <Image style={{ height: pixelConverter(50), width: pixelConverter(50) }} source={require('../../assets/images/calendar.png')}></Image>
                </TouchableHighlight>
              </View>
              <TextInput style={[styles.textInput, { height: pixelConverter(116) }]} words={true} multiline={true} placeholderTextColor='grey' placeholder={this.props.Concepto} onChangeText={(text) => this.setState({ concepto: text })} ref='_3' />
              <TouchableHighlight onPress={(this.onAdd.bind(this))} style={styles.button}>
                <Text style={styles.textButton}>Listo!</Text>
              </TouchableHighlight>
            </View>
            <TouchableOpacity style={{ elevation: 10, width: '100%', borderRadius: pixelConverter(100), height: pixelConverter(110), width: pixelConverter(110), right: -pixelConverter(290), marginTop: -pixelConverter(100) }} >
              <Image style={{ height: pixelConverter(110), width: pixelConverter(110) }} source={require('../../assets/images/plus.png')}></Image>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Image style={{ borderRadius: pixelConverter(100), height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/userlista.png')}></Image>
      </View>
    );
  }
  onAdd() {
    if (this.state.date === '') {
      const date = new Date().getDate(); //Current Date
      const month = new Date().getMonth() + 1; //Current Month
      const year = new Date().getFullYear(); //Current Year
      this.setState({
        date: `${month}/${date}/${year}`
      });
    }
    const { Monto, Nombre, concepto } = this.state
    if (Monto == '' || isNaN(Monto)) {
      alert('Recuerde que el campo monto debe estar lleno y ser un valor numerico');
    } else {
      this.props.db.transaction(tx => {
        tx.executeSql(`INSERT INTO ${this.props.TypeList} (Monto,Nombre,Concepto,Fecha,Usuario) VALUES(?,?,?,?,?)`,
          [Monto, Nombre, concepto, this.state.date, this.props.usuario], (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'You are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      actualizar(`SELECT Monto FROM ${this.props.TypeList} WHERE Usuario =?`, this.props.usuario, this.props.db)
                        .then((res) => {
                          if (this.props.TypeList === 'DeboList') {
                            this.props.RefreshDeudasTrue()
                            this.props.UpdateDEBES_(res)
                          } else {
                            this.props.RefreshPrestamoTrue()
                            this.props.UpdateDEBEN_(res)
                          }
                          this.props.RefreshTrue()
                          this.props.navigation.navigate('Home')
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

const mapStateToProps = (state) => {
  return {
    db: state.db,
    usuario: state.usuario,
  }
}
const mapDispathToProps = (dispath) => {
  return {
    RefreshDeudasTrue: () => dispath(RefreshDeudasTrue()),
    RefreshPrestamoTrue: () => dispath(RefreshPrestamoTrue()),
    RefreshTrue: () => dispath(RefreshTrue()),
    UpdateDEBEN_: (deben) => dispath(UpdateDEBEN(deben)),
    UpdateDEBES_: (debes) => dispath(UpdateDEBES(debes)),
  }
}
export default connect(mapStateToProps, mapDispathToProps)(AddNewPrestamo);