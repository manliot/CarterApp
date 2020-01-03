'use strict'
import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    Alert,Image,
    ImageBackground,
    StyleSheet
}from 'react-native'

class LoginView extends Component{
    
    render(){
        return(
            <ImageBackground style={styles.container} source={{uri:'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>
               <View style={styles.container} >
                    
                    <Text style={styles.title}> Bienvenido a CarterAPP 1.0V</Text>
                    <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.button}>
                        <Text style={styles.textButton}> Login </Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        )
    }

    onLogin (){
        Alert.alert(
            'Acceso',
            'Te has logueado en el sistema',
            [
                {
                    text: 'Aceptar',
                    onPress: (this.Aceptar.bind(this))
                },{
                    text:'Cancelar',
                    onPress: (this.cancelar.bind(this))
                }
            ]
        )
    }

    Aceptar(){
        console.log('Login Aceptado')
    }
    cancelar(){
        console.log('Login cancelado')
    }
}



const styles=StyleSheet.create({
    container:{
        flex : 1,
               flexDirection: 'column',
        alignItems:'center'
     },
    button:{
        width: 150,
        height:30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 250,
        marginBottom:10,
        borderRadius: 8,
        borderWidth:1
    
    },
    textButton:{
        color:'white'
    },
    title:{
        marginTop: 150,
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    }
})
//export default LoginView;
module.exports=LoginView;