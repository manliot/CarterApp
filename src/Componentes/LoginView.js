'use strict'
import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    ImageBackground,
    StyleSheet,TextInput
}from 'react-native'
let user
let pass
class LoginView extends Component{
    
    render(){
        return(
            <ImageBackground style={styles.container} source={{uri:'http://appandabout.es/wp-content/uploads/2014/04/fondo-degradado.jpg' }}>
               <View style={styles.container} >
                    <Text style={styles.title}> Bienvenido a CarterAPP 1.0V</Text>
                    
                    <Text style={styles.usYpas}>Usuario</Text>
                    <TextInput style={styles.textIn} placeholder='Usuario' onChangeText={(text)=>user=text} > </TextInput>
                    <Text style={styles.usYpas}> Contraseña</Text>
                    <TextInput  style={styles.textIn} placeholder='Contraseña' onChangeText={(text)=>pass=text}> </TextInput>
                    
                   
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
        console.log('Login acep')
        this.props.navigation.navigate('Home')
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
     title:{
        marginTop: 130,
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    },
    button:{
        width: 150,
        height:30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 70,
        marginBottom:10,
        borderRadius: 8,
        borderWidth:1
    
    },
    textButton:{
        color:'white'
    },   
    usYpas:{
        fontSize:16,
        marginTop:30,
        color:'white'
    },
    textIn:{
        marginTop:7,
        width: 200,
        height:30,
        backgroundColor:'white',
        color:'black'
    }
})
//export default LoginView;
module.exports=LoginView;