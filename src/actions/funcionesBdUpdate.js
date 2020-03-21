import { useDispatch, useSelector } from 'react-redux'
import { UpdateDEBEN, UpdateDEBES } from '../actions/actions'
import React from 'react'
import { View } from 'react-native'

const FuncionesBdUpdate=()=> {
    const usuario = useSelector(state => state.usuario)
    const db = useSelector(state => state.db)
    const dispatch = useDispatch()

    const debes = (tx, res) => {
        let totalTem = 0;
        for (let i = 0; i < res.rows.length; ++i) {
            let item = res.rows.item(i); totalTem = totalTem + item.Monto;
        }
        dispatch(UpdateDEBES(totalTem))
    }
    const deben = (tx, res) => {
        let totalTem = 0;
        for (let i = 0; i < res.rows.length; ++i) {
            let item = res.rows.item(i); totalTem = totalTem + item.Monto;
        }
        dispatch(UpdateDEBEN(totalTem))
    }
    const populateDB = (tx) => {
        tx.executeSql('SELECT Monto FROM DebenList WHERE Usuario=?', [usuario], deben);
        tx.executeSql('SELECT Monto FROM DeboList WHERE Usuario=?', [usuario], debes);
    }
    const GetInfoGeneral = () => {
        console.log('hola mundo ' + usuario)
        db.transaction(populateDB)
    }
    GetInfoGeneral()
    return (
        null
    )
}

export default FuncionesBdUpdate







    //const nombre = useSelector(state => state.nombre)
   //const db = useSelector(state => state.db)
   //const usuario=useSelector(state => state.usuario)
   // const TotalDeben = useSelector(state => state.debenT)
   // const TotalDebes = useSelector(state => state.debesT)
   // const TotalCartera = useSelector(state => state.cartera)
   // const ultimaVez = useSelector(state => state.ultimaVez)


