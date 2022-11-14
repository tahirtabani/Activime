import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  db.collection("activity")
    .get("7mrlJGZrjvyBVyrwGqiU")
    .then((data) => {
      console.log(data, "data from get");
    })
    .catch((err) => {
      console.log(err, "error message");
    });

  // .then((querySnapshot) => {
  //   querySnapshot.docs.forEach((doc) => {
  //     markers.push(doc.data());
  //   });
  // });

  return (
    <View>
      <Text style={{ fontSize: 100 }}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
