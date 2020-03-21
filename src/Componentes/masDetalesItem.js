import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
})
class MasDetalesItem extends Component {
    item = this.props.navigation.state.params.item
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {

        flex: 1
    },
    transacion: {
        flex: 1,
        //backgroundColor: '#5173FF'

    },
    listaAbono: {
        flex: 1,
        //backgroundColor: '#5156FF'
    },
    tex1: {
        fontSize: 14,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft:20
    },
    tex2: {
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft:20
    }
})
export default MasDetalesItem