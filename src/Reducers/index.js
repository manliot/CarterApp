import { combineReducers } from 'redux'
import { openDatabase } from 'react-native-sqlite-storage'; // to DataBase
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

const initialState = {
    db: db,
    nombre: 'defecto',
    usuario: '',
    ultimaVez: '4/1/2020',
    debenT: 0,
    debesT: 0,
    cartera: 0,
    refresh: false,
    refreshPrestamos: false,
    refreshDeudas: false,
}
const reducerInfoGeneral = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTUALIZAR_DEBEN':
            return {
                ...state,
                debenT: action.getDeben,
            }
        case 'ACTUALIZAR_DEBES':
            return {
                ...state,
                debesT: action.getDebes,
            }
        case 'INFO_USER':
            return {
                ...state,
                usuario: action.usuario,
                nombre: action.nombre
            }
        case 'REFRESH_TRUE':
            return {
                ...state,
                refresh: action.val
            }
        case 'REFRESH_FALSE':
            return {
                ...state,
                refresh: action.val
            }
        case 'REFRESH_PRESTAMOS_TRUE':
            return {
                ...state,
                refreshPrestamos: action.val
            }
        case 'REFRESH_PRESTAMOS_FALSE':
            return {
                ...state,
                refreshPrestamos: action.val
            }
        case 'REFRESH_DEUDAS_TRUE':
            return {
                ...state,
                refreshDeudas: action.val
            }
        case 'REFRESH_DEUDAS_FALSE':
            return {
                ...state,
                refreshDeudas: action.val
            }
        default:
            return state
    }

}

export default reducerInfoGeneral;