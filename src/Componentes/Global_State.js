import React, { Component } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase
const db = openDatabase({
    name: 'posqlitExmple.db',
    createFromLocation: '~www/sqlitExmple.db'
},
    (good) => { //in case of success print in the Console
        console.log('OpenMensaje GLOBAL_SATE', good)
    },
    (err) => { // in case of error print in the Console
        console.log('errorMensaje', err)
    }
)
module.exports = {
    db: db,
};


/*
export default class GLOBAL extends Component {
    static getdb() {
        return db
    }
    render() {
        return (null)
    }

}
*/