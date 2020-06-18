/* import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'native-base';
import React, { Component } from 'react'
const db = openDatabase({
    name: 'posqlitExmple.db',
    createFromLocation: '~www/sqlitExmple.db'
},
(good) => { //in case of success print
        console.log('OpenMensaje ' + good.dbname)
    },
    (err) => { // in case of error print
        console.log('errorMensaje', err.dbname)
    }
)
let usuario = '';
let totalDeben = 0;
let totalDebes = 0;
let changeDeben = false
let changeDebes = false

const populateDB = (tx) => {
    if (changeDeben) tx.executeSql('SELECT Monto FROM DebenList WHERE Usuario=?', [usuario], deben.bind(this));
    if (changeDebes) tx.executeSql('SELECT Monto FROM DeboList WHERE Usuario=?', [usuario], debes.bind(this));
}
function deben(tx, res) {
    let totalTem = 0;
    for (let i = 0; i < res.rows.length; ++i) {
        let item = res.rows.item(i); totalTem = totalTem + item.Monto;
    }
    totalDeben = totalTem
    //this.props.UpdateDEBEN_(totalTem).bind(this)
}
const debes = (tx, res) => {
    let totalTem = 0;
    for (let i = 0; i < res.rows.length; ++i) {
        let item = res.rows.item(i); totalTem = totalTem + item.Monto;
    }
    totalDebes = totalTem
    //this.props.UpdateDEBES_(totalTem).bind(this)
}
function getTotalMonto(user, chDeben, chDebes) {
    const stata = useSelector(state => state.usuario)
    console.log(stata)

    usuario = user
    changeDeben = chDeben
    changeDebes = chDebes
    let ret = { changeDeben, changeDebes, totalDeben, totalDebes }
    db.transaction(populateDB.bind(this))
    return (<View>nada</View>)
}
//console.log(getTotalMonto("Admin", true, true))
module.exports = getTotalMonto */