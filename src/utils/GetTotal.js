import React, { Component, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { UpdateDEBEN, UpdateDEBES } from '../actions/actions'
import { Text, View, ActivityIndicator, Modal } from 'react-native'
import { NavigationEvents } from 'react-navigation';

const funcionesBdUpdate = () => {
    const [actualizando, setActualizando] = useState(true)
    const usuario = useSelector(state => state.usuario)
    const db = useSelector(state => state.db)
    const dispatch = useDispatch()
    const typeList = 'Ambas_Listas'
    const ActualizaMonto = () => {
        console.log('-----', usuario)
        if (typeList === "DebenList" || typeList === "Ambas_Listas") {
            getTotalMonto('SELECT Monto FROM DebenList WHERE Usuario=?')
                .then((res) => {
                    setActualizando(false)
                    console.log('result:', res)
                    dispatch(UpdateDEBEN(res))
                    //this.props.navigation.navigate('Home')
                }).catch((err) => { console.log(err) })
        }
        /*   if (this.props.navigation.state.params.typeList === "DeboList" || this.props.navigation.state.params.typeList === "Ambas_Listas") {
      getTotalMonto('SELECT Monto FROM DeboList WHERE Usuario=?')
          .then((res) => {
              setActualizando(false)
              this.props.UpdateDEBES_(res)
              this.props.navigation.navigate('Home')
          }).catch((err) => { console.log(err) })
  } */

    }
    const getTotalMonto = (query) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(query, [usuario],
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
    ActualizaMonto()
    return (
        <View style={{ justifyContent: "center", alignItems: 'center', height: '100%' }}>
            <NavigationEvents
                onWillFocus={payload => {
                    ActualizaMonto()
                }}
            />
            <ActivityIndicator animating={actualizando} size="large" color="#0000ff" />
        </View>
    )

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
export default funcionesBdUpdate
/* export default connect(mapStateToProps, mapDispathToProps)(funcionesBdUpdate); */

