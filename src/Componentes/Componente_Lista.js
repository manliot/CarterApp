import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header } from 'native-base'
import { NavigationEvents } from 'react-navigation';
import Moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/es-CO'; // or any other locale you need

//redux
import { connect } from 'react-redux'
import { UpdateDEBEN, UpdateDEBES, RefreshFalse } from '../actions/actions'

import pixelConverter from '../dimxPixels'

//sera usada para agrupar las box 
let Fecha
//formateo del monto formato estadounidense
//const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', })
const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
})
class listaPrestamos extends Component {
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
    }
    getLista = () => {
        // se llena el flatlistItem con el resultado del query
        this.props.db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${this.props.TypeList} WHERE Usuario=?`,
                [this.props.usuario],
                (tx, res) => {
                    var temp = new Array();
                    for (let i = 0; i < res.rows.length; ++i) {
                        let item = res.rows.item(i)
                        const Id = ''
                        if (this.props.TypeList == 'DebenList') {
                            Id = item.IDdeben
                        } else if (this.props.TypeList == 'DeboList') {
                            Id = item.IDdebo
                        } else console.error('Faltan datos para poder llenar el componente')
                        temp[i] = { ...item, Id }
                    }
                    this.setState({ FlatListItems: temp, refreshing: false });
                }, this.errorDB)
        })
    };
    errorDB(error) {
        console.error(error)
    }
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <View style={{ width: Dimensions.get('window').width - 63, alignItems: 'flex-start' }}>
                        <View style={styles.search}>
                            <Image style={{ height: pixelConverter(40), width: pixelConverter(40), left: pixelConverter(25), }} source={require('../../assets/images/search.png')}></Image>
                            <TextInput style={{ position: 'relative', color: '#F0F0F0', left: -pixelConverter(30), height: pixelConverter(70), width: pixelConverter(545), paddingBottom: pixelConverter(17), paddingStart: pixelConverter(65), fontSize: pixelConverter(30) }} placeholderTextColor='#F0F0F0' placeholder='Buscar' />
                        </View>
                    </View>
                    <Image style={{ borderRadius: pixelConverter(100), height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/userlista.png')}></Image>
                </Header>
                <FlatList
                    ListHeaderComponent={
                        <View>
                            <NavigationEvents
                                onWillFocus={payload => {
                                    if (this.props.refresh) {
                                        this.setState({ refreshing: true }, () => {
                                            this.props.RefreshFalse()
                                            this.getLista()
                                        })
                                    }
                                }}
                            />
                        </View>
                    }
                    style={{ backgroundColor: '#B2E9AB' }}
                    ref='myFlatList'
                    data={this.state.FlatListItems}
                    renderItem={this.renderItemComponent.bind(this)}
                    keyExtractor={item => `i${item.Id}`}
                    refreshing={this.state.refreshing}
                    onRefresh={this.UpdateList}
                />
                <TouchableOpacity style={{ elevation: 10, width: '100%', borderRadius: pixelConverter(100), height: pixelConverter(120), width: pixelConverter(120), marginTop: pixelConverter(-132), position: 'absolute', right: pixelConverter(30), bottom: pixelConverter(25) }} onPress={() => null} >
                    <Image style={{ height: pixelConverter(120), width: pixelConverter(120), }} source={require('../../assets/images/plus.png')}></Image>
                </TouchableOpacity>
            </Container >
        );
    }
    renderItemComponent = (itemObject) => {
        const { item } = itemObject
        let igualFecha = true
        if (item.Fecha != Fecha) {
            igualFecha = false
            Fecha = item.Fecha
        }
        return (//View de los items del FlatList
            <View style={styles.container_lista} >
                {!igualFecha && (
                    <Text style={styles.fecha}>{Moment(item.Fecha).format("DD MMM [de] YYYY")} </Text>
                )}
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.setState({ item: item })} >
                    <View style={styles.lista} >
                        <View style={styles.top} >
                            <Text style={styles.tex2} > {this.props.quien}</Text>
                            <Text style={styles.tex3}>{formatter.format(item.Monto)} </Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.tex}> {item.Nombre} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {(item.Id == this.state.item.Id) && // se muestra cuando le doy click a el icono de expandir
                    this.GoDetails()
                }
            </View>
        )
    };
    UpdateList = () => {
        this.setState({ refreshing: true }, () => {
            this.getLista()
        })//this.refs.myFlatList.scrollToEnd();
    }
    GoDetails() {
        this.props.navigation.navigate('Detalles', { item: this.state.item, TypeList: this.props.TypeList })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    header: {
        backgroundColor: '#B2E9AB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: pixelConverter(14),
        width: pixelConverter(545),// si se cambia entonces cambiar en el gettConceptoview
        backgroundColor: '#a7a9a3',
        height: pixelConverter(70),
        borderRadius: pixelConverter(10),
    },
    fecha: {
        marginTop: pixelConverter(50),
        marginBottom: pixelConverter(10),
        color: '#959595',
        fontSize: pixelConverter(28),
    },
    touchableOpacity: {
        padding: 0,
        borderRadius: pixelConverter(10),
    },
    lista: {
        marginTop: pixelConverter(27),
        backgroundColor: '#ecfcff',
        paddingTop: pixelConverter(25),
        paddingBottom: pixelConverter(20),
        paddingEnd: pixelConverter(18),
        paddingStart: pixelConverter(27),
        width: Dimensions.get('window').width - 65,// si se cambia entonces cambiar en el gettConceptoview
        height: pixelConverter(120),
        borderRadius: pixelConverter(10),
        elevation: 5,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    bottom: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    container_lista: {
        alignItems: 'center'
    },
    tex: {
        fontSize: pixelConverter(31),
        color: '#65D359',
        fontFamily: 'Roboto-Bold'
    },
    tex2: {
        color: '#6F6C6C',
        fontSize: pixelConverter(27),
    },
    tex3: {
        fontSize: 16,
        alignItems: 'flex-end',
        fontFamily: 'Roboto-Bold',
        flex: 1,
        textAlign: 'right'
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