import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native'
import { Container, Header } from 'native-base'
import { NavigationEvents } from 'react-navigation';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

import { connect } from 'react-redux'
import pixelConverter from '../dimxPixels'
//actions
import { UpdateDEBEN, UpdateDEBES, RefreshFalse } from '../actions/actions'
import dimxPixels from '../dimxPixels';
import { TextInput } from 'react-native-gesture-handler';

//scenes

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', })

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
                <Header style={styles.header}>
                    <View style={styles.search}>
                        <Image style={{ height: pixelConverter(40), width: pixelConverter(40), left: pixelConverter(25), }} source={require('../../assets/images/search.png')}></Image>
                        <TextInput style={{ position: 'relative', color: '#F0F0F0', left: -pixelConverter(30), height: pixelConverter(70), width: pixelConverter(545), paddingBottom: pixelConverter(17), paddingStart: pixelConverter(65), fontSize: pixelConverter(30) }} placeholderTextColor='#F0F0F0' placeholder='Buscar'>

                        </TextInput>
                    </View>
                    <Image style={{ height: pixelConverter(88), width: pixelConverter(88), position: 'absolute', top: pixelConverter(7), right: pixelConverter(20) }} source={require('../../assets/images/userlista.png')}></Image>
                </Header>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                            <NavigationEvents
                                onWillFocus={payload => {
                                    if (this.props.refresh) {
                                        this.setState({
                                            refreshing: true
                                        }, () => {
                                            this.props.RefreshFalse()
                                            this.getLista()
                                            this.getTotalMonto()
                                            this.refs.myFlatList.scrollToEnd();
                                        })
                                    }
                                }}
                            />
                        </View>
                    }
                    style={{ flex: 1, backgroundColor: '#B2E9AB' }}
                    ref='myFlatList'
                    data={this.state.FlatListItems}
                    renderItem={this.renderItemComponent}
                    keyExtractor={item => 'i' + item.Id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.UpdateList}
                />
                <View style={{ elevation: 10, width: '100%' }}>
                    <Image onPress={() => { this.props.navigation.openDrawer() }} style={{ height: pixelConverter(132), width: pixelConverter(132), marginTop: pixelConverter(-132), position: 'absolute', right: pixelConverter(15), bottom: pixelConverter(25) }} source={require('../../assets/images/plus.png')}></Image>
                </View>
            </Container >
        );
    }
    cambiarParaEXPANDIR(item) {
        console.log(this);
        this.setState({ item: item, expandir: !this.state.expandir, })
    }
    renderItemComponent = ({ item }) => (//View de los items del FlatList
        <View style={styles.container_lista} >
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.setState({ item: item, expandir: !this.state.expandir, })} >
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
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    header: {
        backgroundColor: '#B2E9AB',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        marginStart: '7%',
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
    touchableOpacity: {
        padding: 0,
        borderRadius: pixelConverter(10),
    },
    lista: {
        marginTop: pixelConverter(27),
        backgroundColor: '#ecfcff',
        paddingTop: pixelConverter(25),
        paddingBottom: pixelConverter(18),
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
        color: '#6F6C6C',
        fontSize: pixelConverter(27),
    },
    tex: {
        fontSize: pixelConverter(33),
        color: '#65D359',
        fontFamily: 'Roboto-Bold'
    },
    tex3: {
        fontSize: 16,
        alignItems: 'flex-end',
        fontFamily: 'Roboto-Bold',
        flex: 1,
        textAlign: 'right'
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