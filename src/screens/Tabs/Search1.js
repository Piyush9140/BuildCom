import { View, Text,StyleSheet, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../../common/Header";

const Search1 = () => {
  const products = useSelector((state) => state);
  console.log(JSON.stringify(products.product.data));
  return (
    <View style={styles.container}>
      <Header title={'search Item'}/>
      <View style={styles.searchView}>
      </View>
    </View>
  );
};

export default Search1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  searchView:{
    width:'90%',
    height:50,
    borderRadius:20,
    borderWidth:0.5,
    alignSelf:'center',
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
});
