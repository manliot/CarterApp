import React,{Component} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'

class CarteraApp extends Component{

  render(){

    return(
      <View style={styles.container}> 

        <View style={styles.header}>

          <View style={styles.headerLeft}> 
        
          </View>

          <View style={styles.headerRight}> 

          </View>

        </View>
    
        <View style={styles.body}>  
          <Text>This is CarteraApp </Text>
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
  header:{
    flex: 0.3,
    flexDirection: 'row'
  },

  headerLeft:{
    flex:1,
    backgroundColor: 'yellow'
  },

  headerRight:{
    flex: 1,
    backgroundColor:'blue'
  },

  body:{
    flex: 1,
    backgroundColor:'red',
    alignItems:'center'
  }
})

export default CarteraApp