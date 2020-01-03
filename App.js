import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,Button,Navigator,TouchableHighlight} from 'react-native'
 
const Login=require('./src/Componentes/LoginView');
var NavigatorMapRouteMapper={
  leftButton: function(route,navigator,index){
    return(
      <TouchableHighlight onPress ={()=>{
        if(index>0){
          navigator.pop();
        }
      }}>
        <Text>Atras </Text>
      </TouchableHighlight>
    )
  }
}
class CarteraApp extends Component{
    render(){
    
    return(
      <View style={styles.container}> 
        <Text style={styles.Titulo}> CarterAPP 1.0 V</Text>
          
        <View style={styles.header}>
          <View style={styles.menu}> 
            <Text>m</Text>
          </View>
          <View style={styles.nomina}>
            <Text>  Te deben: </Text>  
            <Text> Debes:</Text>
            <Text> Cartera:</Text>
          </View>
          <View style={styles.nomina}>
            <Text> 10.000 </Text>
            <Text> 2.000</Text>
            <Text> 100.000</Text>

          </View>
          
        </View>
        <View style={styles.Titulo}>
          <Text> Lista de los que te deben%%:</Text>

        </View>
        <View style={styles.lista}> 
            <Text> Monto</Text>
            <Text> Nombre</Text>
            <Text> Concepto</Text>
            <Text> Fecha</Text>
          </View>
        <View style={styles.body}>  
          
        </View>
        
      </View>
      
    )

  }
}

const styles = StyleSheet.create({
  container:{
     flex : 1,
     justifyContent: 'center',
     flexDirection: 'column'
  },

  Titulo:{
    flex:0.05,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  header:{
    flex: 0.25,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    justifyContent:'space-around',
  },
  menu:{
    flex:0.5,
    justifyContent:'flex-start',
    backgroundColor:'white'
  },
  nomina:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center'
    
  },
  lista:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'white'
  },

  body:{
    flex: 1,
    backgroundColor:'blue'
  }
})

export default CarteraApp
