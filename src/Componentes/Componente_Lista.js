import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, FlatList, Dimensions, TouchableWithoutFeedbackBase, Alert, } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


//scenes


import InfoGeneral from './InfoGeneral'
import { NavigationEvents } from 'react-navigation';

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
            refreshing: false,
            expandir: false,
            idItem: '',
        }
    }
    componentDidMount() {
        this.getLista();
    }
    getLista = () => {
        function ItemList(Id, Monto, Nombre, Concepto, Fecha) {
            this.Id = Id,
                this.Monto = Monto,
                this.Nombre = Nombre,
                this.Concepto = Concepto,
                this.Fecha = Fecha
        }
        const { params } = this.props.navigation.state;
        this.setState({ usuario: params.usuario })
        db.transaction(tx => {// se llena el flatlistItem con el resultado del query
            tx.executeSql(`SELECT * FROM ${this.props.TypeList} WHERE Usuario=?`, [this.state.usuario],
                (tx, res) => {
                    var temp = new Array();
                    for (let i = 0; i < res.rows.length; ++i) {
                        let item = res.rows.item(i)
                        const Id = ''
                        if (this.props.TypeList == 'DebenList') {
                            Id = item.IDdeben
                        } else if (this.props.TypeList == 'DeboList') {
                            Id = item.IDdebo
                        }
                        let tempItem = new ItemList(Id, item.Monto, item.Nombre, item.Concepto, item.Fecha);
                        temp[i] = tempItem;
                    }
                    this.setState({
                        FlatListItems: temp,
                        refreshing: false
                    });
                })
        })
    };

    render() {
        return (

            <FlatList
                ListHeaderComponent={
                    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>

                        <InfoGeneral style={styles.InfoGeneral} nav={this.props.navigation.state} ref="infoG" />
                        <NavigationEvents
                            onWillFocus={payload => this.refs.infoG.getInfo()}
                        />
                        <View style={styles.Titulo}>
                            <Text style={styles.tex}>  {this.props.Txt} </Text>
                        </View>
                    </View>
                }
                style={{ flex: 1, backgroundColor: '#ecfcff' }}
                ref='myFlatList'
                data={this.state.FlatListItems}
                renderItem={this.renderItemComponent}
                keyExtractor={item => 'i' + item.Id}
                refreshing={this.state.refreshing}
                onRefresh={this.UpdateList}
            />
        );
    }
    renderItemComponent = ({ item }) => (//View de los items del FlatList
        <View>
            <View style={styles.lista}>
                <View style={styles.ListaLeft}>
                    <Text> {item.Fecha} </Text>
                    <Text style={styles.tex}> {item.Nombre} </Text>
                </View>
                <View style={styles.ListaRight}>
                    <Text style={styles.tex}> ${item.Monto} </Text>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ expandir: !this.state.expandir, idItem: item.Id }) }}>
                        <EvilIcons name={(item.Id == this.state.idItem && this.state.expandir) ? 'chevron-up' : 'chevron-down'} size={30} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {(item.Id == this.state.idItem && this.state.expandir) && // se muestra cuando le doy click a el icono de expandir
                this.getConceptoView({ item })
            }
        </View>
    );

    getConceptoView = ({ item }) => {//View de concepto (se expande dando click en el icono)
        return (
            <View style={styles.Concepto}>
                <Text ref='texto' style={{ width: Dimensions.get('window').width - 82 }}> {item.Concepto}</Text>
                <View style={{ marginLeft: 5, justifyContent: 'center' }}>
                    <TouchableWithoutFeedback ref= 'borrar' onPress={this.alertaBorrar.bind(this)}>
                        < AntDesign name='delete' size={30} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.texabonar}>Borrar</Text>
                    <TouchableWithoutFeedback onPress={this.alertaAbonar.bind(this)} >
                        <MaterialIcons name='payment' size={30} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.texabonar}>abonar</Text>
                </View>

            </View>)
    }
    UpdateList = () => {
        this.setState({
            refreshing: true,
            refreshingInfoGeneral: !this.state.refreshing,
        }, () => {
            this.getLista()
            this.refs.infoG.getInfo()
        })
       // this.refs.myFlatList.scrollToEnd();
    }
    alertaBorrar() {
        
        Alert.alert(
            'Advertencia!', 'Una vez borrado el item no podra ser recuperado ¿seguro que desea borrarlo?',
            [
                {
                    text: 'Si!',
                    onPress: this.DeleteItem.bind(this)
                },
                {
                    text: 'Cancelar'
                }
            ],

        )
    }
    alertaAbonar(){
        Alert.alert(
            'Proximamente..',
            'Actualmente nos econtramos trabajando en esta caracteristica, Disculpe las molestias <3',
            [
                {
                    text: 'Ok'
                }
            ]
        )
    }
    DeleteItem() {
        let query = ''
        if (this.props.TypeList == 'DeboList') {
            query = 'DELETE FROM  DeboList where IDdebo=?'
        } else if (this.props.TypeList == 'DebenList') {
            query = 'DELETE FROM  DebenList where IDdeben=?'
        }
        db.transaction(tx => {
            tx.executeSql(query, [this.state.idItem], (tx, res) => {
                if (res.rowsAffected > 0) {
                    this.getLista()
                    Alert.alert(
                        'Borrado exitoso',
                        'Se ha borado el item satifactoriamente',
                        [
                            {
                                text: 'Ok'
                            }
                        ]
                    )
                } else {
                    console.log('error #100: no se ha borrado ningun elemento de la tabla {DebenItem}')
                }
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    InfoGeneral: {
        flex: 1,
    },
    lista: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#ecfcff',
        marginLeft: 17.5,
        width: Dimensions.get('window').width - 35,// si se cambia entonces cambiar en el gettConceptoview
        height: 62,
        borderWidth: 0.3,
        //borderBottomWidth: 1.5,
        color: 'grey',
        borderBottomColor: 'grey',
        borderRadius: 4,
    },
    Concepto: {

        marginTop: 0,
        flexDirection: 'row',
        backgroundColor: '#b2fcff',
        marginLeft: 17.5,
        width: Dimensions.get('window').width - 35,
        height: 100,
        borderWidth: 0.5,
        borderBottomWidth: 1.5,
        color: 'grey',
        borderBottomColor: 'grey',
        borderRadius: 4,
    },
    ConceptoRight: {
        flex: 1,
        backgroundColor: 'blue'
    },
    ConceptoLeft: {
        flex: 3,
        marginLeft: 12.5,

    },
    tex: {
        fontSize: 16,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        fontWeight: 'bold'
    },
    Titulo: {
        backgroundColor: '#ecfcff',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    ListaLeft: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    ListaRight: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    texabonar: {
        marginTop: 0,
        fontSize: 11,
        color: 'black'
    },
})
export default listaPrestamos