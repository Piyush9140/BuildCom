import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../common/CustomButton";
import { useDispatch } from "react-redux";
import { addItemToWishList } from "../Redux/slices/WishlistSlice";
import { ScrollView } from "react-native-gesture-handler";
import { addItemToCart } from "../Redux/slices/CartSlice";

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../images/left-arrow.png")}
        RightIcon={require("../images/shopping-bag.png")}
        title={"Product Details "}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />

      <Image source={{ uri: route.params.data.image }} style={styles.image} />
      <Text style={styles.title}>{route.params.data.title}</Text>
      <Text style={styles.detail}>{route.params.data.description}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.price, { color: "#000" }]}>{"Price: "}</Text>
        <Text style={styles.price}>{"$" + route.params.data.price}</Text>
        <View style={styles.qtyView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (qty > 1) {
                setqty(qty - 1);
              }
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{qty}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setqty(qty + 1);
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.wishlist}
        onPress={() => {
          dispatch(addItemToWishList(route.params.data));
        }}
      >
        <Image source={require("../images/heart.png")} style={styles.icon} />
      </TouchableOpacity>
      <CustomButton
        bg={"#FAC000"}
        title={"Add To Cart"}
        onClick={() => {
          console.log(route.params.data);
          dispatch(
            addItemToCart({
              category:route.params.data.category ,
              description:route.params.data.description,
              id: route.params.data.id,
              image:route.params.data.image,
              price: route.params.data.price,
              qty: qty,
              rating: route.params.data.rating,
              title: route.params.data.title,
            }),
          );
        }}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "center",
  },
  title: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 30,
  },
  detail: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  price: {
    color: "green",
    marginLeft: 30,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
  },
  wishlist: {
    position: "absolute",
    right: 12,
    top: 120,
    backgroundColor: "#E2DFDF",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 22,
    height: 22,
  },
  qtyView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
});
