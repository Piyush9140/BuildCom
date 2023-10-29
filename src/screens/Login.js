import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const loginUser = () => {
    const db1 = db;
   
    const citiesRef = collection(db1, "users");

    // Create a query against the collection.
    const q = query(citiesRef, where("email", "==", email));
    console.log(q)
  };
  //   const docRef = doc(db1, "pass", "email");
  //   const docSnap = getDoc(docRef);

  //   if (docSnap) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };
  //   const gotonext = async () => {
  //     await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
  //     navigation.navigate('Main');
  //   };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Login"}</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={pass}
        onChangeText={(txt) => setPass(txt)}
      />

      <CustomButton
        bg={"#E27800"}
        title={"Login"}
        color={"#fff"}
        onClick={() => {
          loginUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        {"Sign up"}
      </Text>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#000",
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  loginText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
