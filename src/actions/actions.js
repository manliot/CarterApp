export const ACTUALIZAR_ESTADO = 'ACTUALIZAR_ESTADO'
export const INFO_USER = 'INFO_USER'
export const ACTUALIZAR_DEBEN = 'ACTUALIZAR_DEBEN'
export const ACTUALIZAR_DEBES = 'ACTUALIZAR_DEBES'
export const REFRESH_TRUE = 'REFRESH_TRUE'
export const REFRESH_FALSE = 'REFRESH_FALSE'
export const REFRESH_PRESTAMOS_TRUE = 'REFRESH_PRESTAMOS_TRUE'
export const REFRESH_PRESTAMOS_FALSE = 'REFRESH_PRESTAMOS_FALSE'
export const REFRESH_DEUDAS_TRUE = 'REFRESH_DEUDAS_TRUE'
export const REFRESH_DEUDAS_FALSE = 'REFRESH_DEUDAS_FALSE'

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
export function RefreshPrestamoTrue() {
    return {
        type: REFRESH_PRESTAMOS_TRUE,
        val: true
    }
}
export function RefreshPrestamoFalse() {
    return {
        type: REFRESH_PRESTAMOS_FALSE,
        val: false
    }
}
export function RefreshDeudasTrue() {
    return {
        type: REFRESH_DEUDAS_TRUE,
        val: true
    }
}
export function RefreshDeudasFalse() {
    return {
        type: REFRESH_DEUDAS_FALSE,
        val: false
    }
}

