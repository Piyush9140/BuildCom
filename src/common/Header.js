import { View, Text,StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
const {height,width}=Dimensions.get('window');
const Header = ({title,leftIcon,RightIcon,onClickLeftIcon,onClickRightIcon}) => {
  return (
    <View style={styles.header}>
       <TouchableOpacity style={styles.btn}>
         <Image source={leftIcon} style={styles.icon}/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btn}>
         <Image source={RightIcon} style={styles.icon}/>
       </TouchableOpacity>
    </View>
  );
  
};
export default Header
const styles=StyleSheet.create({
    header:{
        width: width,
        height: 65, 
        marginTop:25,
        backgroundColor:'#0786DAFD',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        paddingLeft:15,
        paddingRight:15,

    },
    btn:{
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    icon:{
        width:30,
        height:30,
        tintColor:'#fff'
    }
});