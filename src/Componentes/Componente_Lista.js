import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, FlatList, Dimensions, Alert, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Header, Left, Right, Body, Title, Icon, Container, } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

import { connect } from 'react-redux'

//actions
import { UpdateDEBEN, UpdateDEBES, RefreshFalse } from '../actions/actions'

//scenes
import InfoGeneral from './InfoGeneral'
import { NavigationEvents } from 'react-navigation';
import { HeaderTitle } from 'react-navigation-stack'

const formatter = new Intl.NumberFormat('es-CO', {
    style: "currency", currency: "COP", minimumFractionDigits: 0
})
class listaPrestamos extends Component {
    populateDB(tx) {
        tx.executeSql('SELECT Monto FROM DebenList WHERE Usuario=?', [this.props.usuario], this.deben.bind(this));
        tx.executeSql('SELECT Monto FROM DeboList WHERE Usuario=?', [this.props.usuario], this.debes.bind(this));
    }
    deben(tx, res) {
        let totalTem = 0;
        for (let i = 0; i < res.rows.length; ++i) {
            let item = res.rows.item(i); totalTem = totalTem + item.Monto;
        }
        this.props.UpdateDEBEN_(totalTem).bind(this)
    }
    debes = (tx, res) => {
        let totalTem = 0;
        for (let i = 0; i < res.rows.length; ++i) {
            let item = res.rows.item(i); totalTem = totalTem + item.Monto;
        }
        this.props.UpdateDEBES_(totalTem).bind(this)
    }
    getTotalMonto = () => {
        this.props.db.transaction(this.populateDB.bind(this))
    }
    constructor() {
        super()
        this.state = {
            FlatListItems: [],
            refreshing: false,
            expandir: false,//usado para controlar cuando mostar el CONCEPTO
            item: '',// usado para obtener el id del item seleccionado (flatlist)
        }
    }
    componentDidMount() {
        this.getLista();
        this.getTotalMonto()
    }
    getLista = () => {
        function ItemList(Id, Monto, Nombre, Concepto, Fecha) {
            this.Id = Id, this.Monto = Monto, this.Nombre = Nombre, this.Concepto = Concepto, this.Fecha = Fecha
        }
        this.props.db.transaction(tx => {// se llena el flatlistItem con el resultado del query
            tx.executeSql(`SELECT * FROM ${this.props.TypeList} WHERE Usuario=?`, [this.props.usuario],
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
        const { navigation } = this.props;
        return (
            <Container>
                <Header style={{ backgroundColor: '#5173FF', borderBottomWidth: 1.5, borderBottomColor: 'grey', }}>
                    <Text style={styles.title}> Sing Up  </Text>
                    <Right>
                        <TouchableHighlight activeOpacity={1} underlayColor='#ecfcff' style={{ width: 40, alignItems: 'center', }} onPress={() => { this.props.navigation.goBack() }}>
                            <Feather name='x-circle' size={25} />
                        </TouchableHighlight>
                    </Right>

                </Header >

                <FlatList
                    ListHeaderComponent={
                        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                            {/* <InfoGeneral style={styles.InfoGeneral} /> */}
                            <NavigationEvents
                                onWillFocus={payload => {
                                    if (this.props.refresh) {
                                        this.setState({
                                            refreshing: true,
                                        }, () => {
                                            this.props.RefreshFalse()
                                            this.getLista()
                                            this.getTotalMonto()
                                        })
                                    }
                                }}
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
            </Container>



        );
    }
    renderItemComponent = ({ item }) => (//View de los items del FlatList
        <View>
            <View style={styles.lista}>
                <View style={styles.ListaLeft}>
                    <Text style={styles.tex2}> {this.props.quien}</Text>
                    <Text style={styles.tex}> {item.Nombre} </Text>
                </View>
                <View style={styles.ListaRight}>
                    <View style={styles.ListaSub2}>
                        <Text style={styles.tex}>{formatter.format(item.Monto)} </Text>
                    </View>
                    <View style={styles.ListaSub}>
                        <TouchableHighlight activeOpacity={1} underlayColor='#ecfcff' style={{ width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.setState({ expandir: !this.state.expandir, item: item }) }}>
                            <AntDesign name='arrowright' size={20} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            {(item.Id == this.state.item.Id && this.state.expandir) && // se muestra cuando le doy click a el icono de expandir
                this.GoDetails()
            }
        </View>
    );
    UpdateList = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.getLista()
            this.getTotalMonto()
        })
        // this.refs.myFlatList.scrollToEnd();
    }
    GoDetails() {
        this.setState({ expandir: !this.state.expandir })
        this.props.navigation.navigate('Detalles', { item: this.state.item, TypeList: this.props.TypeList })
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
        width: Dimensions.get('window').width
    }, title: {
        flex: 1,
        marginTop: 13,
        fontSize: 20,
        color: 'white',
        marginLeft: (Dimensions.get('window').width / 2) - 60,
    },
    lista: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#ecfcff',
        marginLeft: 17.5,
        width: Dimensions.get('window').width - 35,// si se cambia entonces cambiar en el gettConceptoview
        height: 62,
        borderWidth: 0.3,
        color: 'grey',
        borderBottomColor: 'grey',
        borderRadius: 10,
    },
    Concepto: {
        marginTop: 0,
        flexDirection: 'row',
        backgroundColor: '#b2fcff',
        marginLeft: 17.5,
        width: Dimensions.get('window').width - 35,
        height: 100,
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
    tex2: {
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
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
    },
    ListaSub: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    ListaSub2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    ListaRight: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'flex-end',
    },
    texabonar: {
        marginTop: 0,
        fontSize: 11,
        color: 'black'
    },
})

const mapStateToProps = (state) => {
    return {
        db: state.db,
        usuario: state.usuario,
        refresh: state.refresh
    }
}
const mapDispathToProps = (dispath) => {
    return {
        UpdateDEBEN_: (deben) => {
            return dispath(UpdateDEBEN(deben))
        },
        UpdateDEBES_: (debes) => {
            return dispath(UpdateDEBES(debes))
        },
        RefreshFalse: () => {
            return dispath(RefreshFalse())
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(listaPrestamos);