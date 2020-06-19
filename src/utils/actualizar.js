import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux'
import { UpdateDEBEN, UpdateDEBES } from '../actions/actions'
import { Text, View, ActivityIndicator } from 'react-native'
import { NavigationEvents } from 'react-navigation';

const getTotalMonto = (query, usuario, db) => {
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

export default getTotalMonto



