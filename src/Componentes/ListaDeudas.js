import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, Button, Navigator, TouchableHighlight } from 'react-native'

import InfoGeneral from './InfoGeneral'

class listaDeudas extends Component {
    constructor() {
        super()
        this.state = {
            resul: '',
            FlatListItems: [],
            usuario: ''
        }
    }
    render() {
        return (
            <ImageBackground style={styles.container} source={{ uri: 'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>

                <View style={styles.container}>
                    <InfoGeneral style={styles.InfoGeneral} />
                    <View style={styles.Titulo}>
                        <Text style={styles.tex}>Lista de los que les debes:</Text>
                    </View>

                    <View style={styles.lista}>
                        <Text>Id</Text>
                        <Text> Monto</Text>
                        <Text> Nombre</Text>
                        <Text> Concepto</Text>
                        <Text> Fecha</Text>
                    </View>
                    <View style={styles.body}>
                        <Text> soy el componente deudas   </Text>
                        <TouchableHighlight onPress={this.onc.bind(this)}>
                            <Text > Register </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
    onc() {
        const { params } = this.props.navigation.state;
        console.log(params.usuario)
        this.setState({ usuario:params.usuario })
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM DebenList WHERE Usuario=?', [this.state.usuario],
                (tx, res) => {
                    var temp = [];
                    for (let i = 0; i < res.rows.length; ++i) {
                        //temp.push(res.rows.item(i));
                        console.log(res.rows.item(i))
                    }
                    this.setState({
                        FlatListItems: temp,
                      });

                })
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    InfoGeneral: {
        flex: 0.5,
        //backgroundColor: 'blue'
    },
    lista: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    tex: {
        fontSize: 16,
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    Titulo: {
        // backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    body: {
        flex: 1,
        backgroundColor: '#f05555'
    }
})
export default listaDeudas