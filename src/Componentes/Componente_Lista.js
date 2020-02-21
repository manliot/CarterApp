import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, FlatList, Dimensions, TouchableOpacityComponent } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase

import Icon from 'react-native-vector-icons/SimpleLineIcons';

//scenes
import InfoGeneral from './InfoGeneral'

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


class listaPrestamos extends Component {
    constructor() {
        super()
        this.state = {
            usuario: '',
            FlatListItems: [],
            TotalLista:0
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
            tx.executeSql(`SELECT * FROM ${this.props.TypeList} WHERE Usuario=?`, [this.state.usuario],
                (tx, res) => {
                    this.state.TotalLista=0;
                    var temp = new Array();
                    for (let i = 0; i < res.rows.length; ++i) {
                        //temp.push(res.rows.item(i));
                        let item = res.rows.item(i)
                        let tempItem = new ItemList(item.IDdeben, item.Monto, item.Nombre, item.Concepto, item.Fecha);
                        this.state.TotalLista=this.state.TotalLista+item.Monto;//<<-- to infoGeneral
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

            <View style={styles.container}>
                <InfoGeneral style={styles.InfoGeneral}  nav={this.props.navigation.state}/>
                <View style={styles.Titulo}>
                    <Text style={styles.tex}>  {this.props.Txt} </Text>
                </View>

                <View style={styles.body}>
                    <TouchableHighlight onPress={(this.getListaPrestamos.bind(this))} style={styles.button}>
                        <Text style={styles.textButton}> Actualizar </Text>
                    </TouchableHighlight>

                    <FlatList
                        data={this.state.FlatListItems}
                        renderItem={({ item }) => (
                            <View style={styles.lista}>
                                <View style={styles.ListaLeft}>
                                    <Text> {item.Fecha} </Text>
                                    <Text style={styles.tex}> {item.Nombre} </Text>
                                </View>
                                <View style={styles.ListaRight}>
                                    <Text style={styles.tex}> ${item.Monto} </Text>
                                    <TouchableHighlight>
                                        <Text>ci</Text>
                                    </TouchableHighlight>
                                </View>
                         </View>
                        )}
                         keyExtractor={item => item.id}
                    />
                </View>
            </View>

        );
    }

}
//<Text style={styles.Text}> {item.IDdeben} {item.Concepto} </Text>                                   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    InfoGeneral: {
        flex: 0.5,

    },
    lista: {
        marginTop:15,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 25,
        width: Dimensions.get('window').width - 50,
        height: 50,
        borderBottomWidth: 1.5,
        color: 'grey',
        borderBottomColor: 'grey'

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
        backgroundColor: 'white'
    },
    Text: {
        fontSize: 16,
    },
    ListaLeft: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        //backgroundColor: 'yellow'
    },
    ListaRight: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',

        //backgroundColor: 'blue'
    }
})
export default listaPrestamos