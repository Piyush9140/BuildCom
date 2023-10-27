import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomButton from '../common/CustomButton' 
import { useDispatch } from 'react-redux'
import { addItemToWishList } from '../Redux/slices/WishlistSlice'
import { ScrollView } from 'react-native-gesture-handler'
import { addItemToCart } from '../Redux/slices/CartSlice'

const ProductDetails = () => {
    const navigation=useNavigation()
    const route= useRoute();
    const dispatch= useDispatch();
  return (
    
    <View style={styles.container}>
      <Header leftIcon={require('../images/left-arrow.png')}
      RightIcon={require('../images/shopping-bag.png')}
      title={'Product Details '}  
      onClickLeftIcon={()=>{navigation.goBack();
      } }/>
      
        <Image source={{uri: route.params.data.image}} style={styles.image}/>
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.detail}>{route.params.data.description}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={[styles.price,{color:'#000'}]}>{'Price: '}</Text>
        <Text style={styles.price}>{'$'+route.params.data.price}</Text>
        </View>
        <TouchableOpacity style={styles.wishlist} onPress={()=>{
          dispatch(addItemToWishList(route.params.data));
        }}>
          <Image source={require('../images/heart.png')} style={styles.icon}/>
        </TouchableOpacity>
        <CustomButton bg={'#FAC000'} title={'Add To Cart'} onClick={()=>{
          dispatch(addItemToCart(route.params.data));
        }}/>
    </View> 
  )
}
 
export default ProductDetails

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    image:{
        width:'100%',
        height:300,
        resizeMode:'center',
    },
    title:{
    fontSize:22,
    color:'#000',
    fontWeight:'600',
    marginTop:20,
    marginLeft:30,
    },
    detail:{
    fontSize:16,
    marginTop:10,
    marginLeft:30,
    marginRight:30,
    },
    price:{
        color:'green',
        marginLeft: 30,
        marginTop:20,
        fontSize:20,
        fontWeight:'800',
    },
    wishlist:{
      position:'absolute',
      right:12,
      top:120,
      backgroundColor:'#E2DFDF',
      justifyContent:'center',
      alignItems:'center',
      width:50,
      height:50,
      borderRadius:25,
    },
    icon:{
      width:22,
      height:22,
    },
})