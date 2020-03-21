export const ACTUALIZAR_ESTADO = 'ACTUALIZAR_ESTADO'
export const INFO_USER = 'INFO_USER'
export const ACTUALIZAR_DEBEN = 'ACTUALIZAR_DEBEN'
export const ACTUALIZAR_DEBES = 'ACTUALIZAR_DEBES'
export const REFRESH_TRUE = 'REFRESH_TRUE'
export const REFRESH_FALSE = 'REFRESH_FALSE'

export function SetInfoUser(nombre, usuario) {
    return {
        type: INFO_USER,
        nombre: nombre,
        usuario: usuario
    }
}

export function UpdateDEBEN(deben) {
    return {
        type: ACTUALIZAR_DEBEN,
        getDeben: deben,
    }
}
export function UpdateDEBES(debes) {
    return {
        type: ACTUALIZAR_DEBES,
        getDebes: debes,
    }
}
export function RefreshTrue() {
    return {
        type: REFRESH_TRUE,
        val: true
    }
}
export function RefreshFalse() {
    return {
        type: REFRESH_FALSE,
        val: false
    }
}

