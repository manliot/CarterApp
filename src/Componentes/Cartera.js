import React, { Component } from 'react'
import { Text, View, Alert, Image, Dimensions } from 'react-native'
const h=Dimensions.get('window').height;
const w=Dimensions.get('window').width;

export default class Cartera extends Component {
    componentDidMount() {
        Alert.alert(
            'Proximamente..',
            'Actualmente nos econtramos trabajando en esta caracteristica, Disculpe las molestias <3',
            [
                {
                    text: 'Ok'
                }
            ]
        )
    }
    render() {
        return (
            <View style={{ flex: 1 ,justifyContent:'center',alignItems:'center',backgroundColor:'#befff4'}}>
               <Image source={{ uri: 'https://i0.pngocean.com/files/337/920/1012/red-curry-heart-clip-art-heart-no-background.jpg' }}
            style={{ height: 60, width: 60, borderRadius: 80}} />
            
                <Image source={{ uri: 'https://image.freepik.com/vector-gratis/ilustracion-colorida-programador-trabajando_23-2148281409.jpg' }}
            style={{ height: h/2, width: w, borderRadius: ((h/w)*350)/(1560/720), }} />
            <Text> Working...</Text>
            </View>
        )
    }
}
