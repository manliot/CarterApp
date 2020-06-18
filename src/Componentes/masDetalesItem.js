import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { RefreshDeudasTrue, RefreshPrestamoTrue } from '../actions/actions'

const formatter = new Intl.NumberFormat('es-CO', {
    style: "currency", currency: "COP"
})
class MasDetalesItem extends Component {
    item = this.props.navigation.state.params.item
    componentDidMount() {
        Alert.alert(
            'Proximamente...',
            'Actualmente nos econtramos trabajando en esta caracteristica, Disculpe las molestias <3',
            [
                {
                    text: 'Ok',

                }
            ]
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Detalles del prestamo  </Text>
                <View style={styles.transacion}>
                    <Text style={styles.tex1} >Le prestaste a</Text>
                    <Text style={styles.tex2}>{this.item.Nombre}</Text>
                    <Text style={styles.tex1}>¿Cuanto?</Text>
                    <Text style={styles.tex2}>{formatter.format(this.item.Monto)}</Text>
                    <Text style={styles.tex1}>Para </Text>
                    <Text style={styles.tex2}>{this.item.Concepto} </Text>
                    <Text style={styles.tex1}>Fecha </Text>
                    <Text style={styles.tex2}>{this.item.Fecha}</Text>
                    <Text style={styles.tex1}>Referencia</Text>
                    <Text style={styles.tex2}> {this.item.Id}</Text>
                </View>
                <View style={styles.listaAbono}>
                    <Text>3/21/2020</Text>
                    <Text>5.000</Text>
                    <Text>te abono ahi para que te la vaciles</Text>
                    <Text> {}</Text>
                </View>
                <View style={{ marginLeft: 5, justifyContent: 'center' }}>
                    <TouchableWithoutFeedback ref='borrar' onPress={this.alertaBorrar.bind(this)}>
                        < AntDesign name='delete' size={30} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.texabonar}>Borrar</Text>
                    <TouchableWithoutFeedback onPress={this.alertaAbonar.bind(this)} >
                        <MaterialIcons name='payment' size={30} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.texabonar}>abonar</Text>
                </View>
            </View>
        )
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
                    text: 'Cancelar',
                }
            ],

        )
    }
    alertaAbonar() {
        Alert.alert(
            'Proximamente..',
            'Actualmente nos econtramos trabajando en esta caracteristica, Disculpe las molestias <3',
            [
                {
                    text: 'Ok',

                }
            ]
        )
    }
    DeleteItem() {// puede ir en un archivo separado
        let query = ''
        const TypeList = this.props.navigation.state.params.TypeList
        if (TypeList == 'DeboList') {
            query = 'DELETE FROM  DeboList where IDdebo=?'
        } else if (TypeList == 'DebenList') {
            query = 'DELETE FROM  DebenList where IDdeben=?'
        }
        this.props.db.transaction(tx => {
            tx.executeSql(query, [this.item.Id], (tx, res) => {
                if (res.rowsAffected > 0) {
                    if (TypeList === 'DeboList') {
                        this.props.RefreshDeudasTrue()
                    } else {
                        this.props.RefreshPrestamoTrue()
                    }
                    this.props.navigation.pop()
                    this.props.navigation.navigate('Actualizar', { typeList: TypeList })
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
                    Alert.alert(
                        'Error #100:',
                        'Ya ha borrado este item, vuelva al Inicio, comuniquese con nosotros',
                        [
                            {
                                text: 'Ok'
                            }
                        ]
                    )
                    console.log(`error #100: no se ha borrado ningun elemento de la tabla ${this.item.Id}`)
                }
            })
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    transacion: {
        flex: 1,
    },
    listaAbono: {
        flex: 1,
    },
    tex1: {
        fontSize: 14,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 20
    },
    tex2: {
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 20
    }, texabonar: {
        marginTop: 0,
        fontSize: 11,
        color: 'black'
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
        RefreshPrestamoTrue: () => dispath(RefreshPrestamoTrue())
    }
}
export default connect(mapStateToProps, mapDispathToProps)(MasDetalesItem);