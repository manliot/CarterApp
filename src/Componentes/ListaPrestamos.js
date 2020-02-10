import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button, Navigator, ImageBackground, TouchableHighlight, FlatList, FlatListItems } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase

import Icon from 'react-native-vector-icons/SimpleLineIcons';
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

import InfoGeneral from './InfoGeneral'
class listaPrestamos extends Component {
    constructor() {
        super()
        this.state = {
            usuario: '',
            FlatListItems: [],
        }

    }
    componentDidMount() {
        this.getListaPrestamos();
    }
  
    getListaPrestamos = () => {
        function ItemList(Id, Monto, Nombre, Concepto, Fecha) {
            this.Id = Id,
                this.Monto = Monto,
                this.Nombre = Nombre,
                this.Concepto = Concepto,
                this.Fecha = Fecha
        }

        const { params } = this.props.navigation.state;
        console.log(`El Usuario que hizo Login fue: ${params.usuario}`)
        this.setState({ usuario: params.usuario })
        
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM DebenList WHERE Usuario=?', [this.state.usuario],
                (tx, res) => {
                    var temp = new Array();

                    for (let i = 0; i < res.rows.length; ++i) {
                        //temp.push(res.rows.item(i));
                        let item = res.rows.item(i)
                       
                        let tempItem = new ItemList(item.IDdeben, item.Monto, item.Nombre, item.Concepto, item.Fecha);
                        
                        temp[i] = tempItem;
                    }
                    this.setState({
                        FlatListItems: temp,
                    });

                })
        })
       
    };
    
    render() {

        return (

            <ImageBackground style={styles.container} source={{ uri: 'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>

                <View style={styles.container}>
                    <InfoGeneral style={styles.InfoGeneral} />
                    <View style={styles.Titulo}>
                        <Text style={styles.tex}> Lista de los que te deben: </Text>
                    </View>

                    <View style={styles.lista}>
                        <Text>Id</Text>
                        <Text> Monto</Text>
                        <Text> Nombre</Text>
                        <Text> Concepto</Text>
                        <Text> Fecha</Text>
                    </View>
                   
                    <View style={styles.body}>
                        <TouchableHighlight onPress={(this.getListaPrestamos.bind(this))} style={styles.button}>
                            <Text style={styles.textButton}> Register </Text>
                        </TouchableHighlight>

                        <FlatList
                            data={this.state.FlatListItems}
                            renderItem={({ item }) => (
                                <Text> {item.IDdeben} {item.Monto} {item.Nombre} {item.Concepto} {item.Fecha}</Text>
                            )}
                        />


                    </View>
                </View>
            </ImageBackground>
        );
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
        //backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    header: {
        flex: 0.07,
        justifyContent: 'flex-end',
        backgroundColor: '#f05855'

    },
    body: {
        flex: 1,
        backgroundColor: '#f05555'
    }
})
export default listaPrestamos