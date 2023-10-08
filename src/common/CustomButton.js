import { View, Text, Dimensions,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

const CustumButton = ({bg,title,onClick,color}) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.btn,{backgroundColor:bg}]} onPress={()=>{
      onClick();
    }}>
        <Text style={{color:color,fontSize:18,fontWeight:'500',}}>{title}</Text>
    </TouchableOpacity>
      
    
  )
}

export default CustumButton
const styles=StyleSheet.create({
    btn:{
        width:Dimensions.get('window').width -40, 
        height:50,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:20,
        borderRadius:15,
    }
})