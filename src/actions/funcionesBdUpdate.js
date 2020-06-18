import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UpdateDEBEN, UpdateDEBES } from '../actions/actions'
import { Text, View, ActivityIndicator } from 'react-native'
import { NavigationEvents } from 'react-navigation';

class funcionesBdUpdate extends Component {
    constructor() {
        super()
        this.state = {
            actualizando: true
        }
    }
    ActualizaMonto() {
        if (this.props.navigation.state.params.typeList === "DebenList" || this.props.navigation.state.params.typeList === "Ambas_Listas") {
            this.getTotalMonto('SELECT Monto FROM DebenList WHERE Usuario=?')
                .then((res) => {
                    this.setState({ actualizando: false })
                    this.props.UpdateDEBEN_(res)
                    this.props.navigation.navigate('Home')
                }).catch((err) => { console.log(err) })
        }
        console.log('aja')
        if (this.props.navigation.state.params.typeList === "DeboList" || this.props.navigation.state.params.typeList === "Ambas_Listas") {
            this.getTotalMonto('SELECT Monto FROM DeboList WHERE Usuario=?')
                .then((res) => {
                    this.setState({ actualizando: false })
                    this.props.UpdateDEBES_(res)
                    this.props.navigation.navigate('Home')
                }).catch((err) => { console.log(err) })
        }

    }
    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: 'center', height: '100%' }}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.ActualizaMonto()
                    }}
                />
                <ActivityIndicator animating={this.state.actualizando} size="large" color="#0000ff" />
            </View>
        )
    }
    getTotalMonto = (query) => {
        return new Promise((resolve, reject) => {
            this.props.db.transaction(tx => {
                tx.executeSql(query, [this.props.usuario],
                    (tx, res) => {
                        let totalTem = 0;
                        for (let i = 0; i < res.rows.length; ++i) {
                            let item = res.rows.item(i); totalTem = totalTem + item.Monto;
                        }
                        resolve(totalTem)
                    })
            })
        })
    }
}
const mapStateToProps = (state) => {
    return {
        db: state.db,
        usuario: state.usuario,
    }
}
const mapDispathToProps = (dispath) => {
    return {
        UpdateDEBEN_: (deben) => dispath(UpdateDEBEN(deben)),
        UpdateDEBES_: (debes) => dispath(UpdateDEBES(debes)),
    }
}
export default connect(mapStateToProps, mapDispathToProps)(funcionesBdUpdate);




