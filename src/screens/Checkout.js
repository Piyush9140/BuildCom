import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  emptyCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../Redux/slices/CartSlice";
import CustomButton from "../common/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = () => {
  const navigation = useNavigation();
  const items = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const isFocused = useIsFocused();
  const [selectedAddress, setSelectedAddress] = useState(
    "Please Select Address"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map((item) => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);
  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem("MY_ADDRESS"));
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../images/left-arrow.png")}
        title={"Checkout"}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Text style={styles.title}>Added Items</Text>
        <View>
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.productItem}
                  onPress={() => {
                    navigation.navigate("ProductDetail", { data: item });
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                  <View>
                    <Text style={styles.name}>
                      {item.title.length > 25
                        ? item.title.substring(0, 25) + "..."
                        : item.title}
                    </Text>
                    <Text style={styles.desc}>
                      {item.description.length > 30
                        ? item.description.substring(0, 30) + "..."
                        : item.description}
                    </Text>
                    <View style={styles.qtyview}>
                      <Text style={styles.price}>{"Rs." + item.price}</Text>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          if (item.qty > 1) {
                            dispatch(reduceItemFromCart(item));
                          } else {
                            dispatch(removeItemFromCart(index));
                          }
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          dispatch(addItemToCart(item));
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.totalView}>
          <Text style={styles.title}>Total</Text>
          <Text style={[styles.title, { marginRight: 20 }]}>
            {"Rs." + getTotal()}
          </Text>
        </View>
        <Text style={styles.title}>Select Payment Mode</Text>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(0);
          }}
        >
          <Image
            source={
              selectedMethod == 0
                ? require("../images/radio_1.png")
                : require("../images/radio_2.png")
            }
            style={[
              styles.img,
              { tintColor: selectedMethod == 0 ? "orange" : "black" },
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(1);
          }}
        >
          <Image
            source={
              selectedMethod == 1
                ? require("../images/radio_1.png")
                : require("../images/radio_2.png")
            }
            style={[
              styles.img,
              { tintColor: selectedMethod == 1 ? "orange" : "black" },
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(2);
          }}
        >
          <Image
            source={
              selectedMethod == 2
                ? require("../images/radio_1.png")
                : require("../images/radio_2.png")
            }
            style={[
              styles.img,
              { tintColor: selectedMethod == 2 ? "orange" : "black" },
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(3);
          }}
        >
          <Image
            source={
              selectedMethod == 3
                ? require("../images/radio_1.png")
                : require("../images/radio_2.png")
            }
            style={[
              styles.img,
              { tintColor: selectedMethod == 3 ? "orange" : "black" },
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>Cash on Delivery</Text>
        </TouchableOpacity>
        <View style={styles.addressView}>
          <Text style={styles.title}>Address</Text>
          <Text
            style={[styles.title, { color: "#0269A0FB" }]}
            onPress={() => {
              navigation.navigate("Addresses");
            }}
          >
            Edit Address
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            { marginTop: 10, fontSize: 16, color: "#636363" },
          ]}
        >
          {selectedAddress}
        </Text>
        <View>
          <CustomButton
            bg={'green'}
            title={'Pay & Order'}
            color={'#fff'}
            onClick={() => {
              var options = {
                description: "Credits towards consultation",
                image: "https://i.imgur.com/3g7nmJC.png",
                key: "rzp_test_5YANgYElbJJ9G9",
                prefill: {
                  email: "agarwalmanan69@gmail.com",
                  contact: "7627081914",
                  name: "Manan Agarwal",
                },
                theme: { color: "#F37254" },
              };
              RazorpayCheckout.open(options)
                .then((data) => {
                  // handle success
                  alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch((error) => {
                  // handle failure
                  alert(`Error: ${error.code} | ${error.description}`);
                });
            }}
          >
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: "#000",
  },
  productItem: {
    width: Dimensions.get("window").width,
    height: 100,
    marginTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: "green",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
  noItems: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  totalView: {
    width: "100%",
    justifyContent: "space-between",

    flexDirection: "row",
    height: 70,
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "#B7B7B7",
  },
  paymentMethods: {
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentMethdodsTxt: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
  },
  addressView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 20,
  },
});
