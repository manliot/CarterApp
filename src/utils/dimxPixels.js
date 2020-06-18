import { create } from 'react-native-pixel-perfect'

const designResolution = {
    width: 720,
    height: 1280
}  // este tamaño es el tamaño para el que está hecho su diseño (tamaño de pantalla) 
export default perfectSize = create(designResolution)

//perfectSize(50)// //  devuelve el tamaño real necesario para que 50 se ajuste perfectamente a la pantalla de acuerdo con el diseño original
