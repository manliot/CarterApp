import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,Button,Navigator,TouchableHighlight} from 'react-native'

let deben=100;
let debes=200;
let cartera=300;

class Listra extends Component{
  constructor(){
    super()
  
  }
  render (){
    return(
      <View style={styles.body}>  
      
      </View>
    )
  }
  
  llenar(){
   this.setState(
     
   )
  }
  

}

class PrincipalView extends Component{
  constructor(props){
    super(props)
    this.state
  }
  
  render(){
    
    return(
      <View style={styles.container}> 
        <Text style={styles.Titulo}> CarterAPP 1.0 V</Text>
        <View style={styles.header}>
          <View style={styles.menu}> 
            <Text>m</Text>
          </View>
          <View style={styles.nomina}>
            <Text style={styles.tex}>  Te deben: </Text>  
            <Text style={styles.tex}> Debes:</Text>
            <Text style={styles.tex}> Cartera:</Text>
          </View>
          <View style={styles.nomina}>
            
            <Text style={styles.tex}>  {deben}</Text>
            <Text style={styles.tex}> {debes}</Text>
            <Text style={styles.tex}> {cartera}</Text>


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
        <Listra/>
        
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
    justifyContent:'center',
    fontSize:14
    
  },
  lista:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'white'
  },
  tex:{
    fontSize:18
  },

  body:{
    flex: 1,
    backgroundColor:'black'
  }
})

export default PrincipalView
